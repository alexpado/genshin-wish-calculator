import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state    : {
        packs: {
            region  : 'eu',
            currency: 'EUR',
            content : {
                pack1: 60,
                pack2: 330,
                pack3: 1090,
                pack4: 2240,
                pack5: 3880,
                pack6: 8080
            },
            prices  : {
                eu: {
                    pack1: 1.09,
                    pack2: 5.49,
                    pack3: 16.99,
                    pack4: 32.99,
                    pack5: 54.99,
                    pack6: 109.99
                }
            }
        },
        form : {
            belongings: {
                intertwined: 0,
                starglitter: 0,
                stardust   : 0,
                primogems  : 0,
                genesis    : 0,
                welkin     : 0
            },
            settings  : {
                untilPull        : 0,
                wishBought       : 0,
                currentPity      : 0,
                injectStarglitter: false
            },
            packs     : {
                pack1: 0,
                pack2: 0,
                pack3: 0,
                pack4: 0,
                pack5: 0,
                pack6: 0,
            }
        }
    },
    getters  : {
        monthUntilPull          : state => {
            const date = new Date();

            let start = {
                month: date.getMonth(),
                year : date.getFullYear()
            };

            date.setDate(date.getDate() + state.form.settings.untilPull);

            let end = {
                month: date.getMonth(),
                year : date.getFullYear()
            };

            return 12 * (end.year - start.year) + (end.month - start.month);
        },
        pity                    : () => (wishes, pity) => {
            const effectivePity = pity || 0;
            return {
                min: {
                    four: (wishes + (effectivePity % 10)) / 10,
                    five: (wishes + (effectivePity % 90)) / 90
                },
                max: {
                    four: (wishes + (effectivePity % 10)) / 10,
                    five: (wishes + (effectivePity)) / 75
                }
            }
        },
        starglitterFromPity     : () => pity => {
            return {
                min: Math.max((Math.floor(pity.min.four) * 2) + (Math.floor(pity.min.five) * 10), 0),
                max: (Math.floor(pity.max.four) * 5) + (Math.floor(pity.max.five) * 25)
            }
        },
        primogems               : state => {
            return state.form.belongings.primogems;
        },
        primogemsFromCrystals   : state => {
            return state.form.belongings.genesis;
        },
        primogemsFromCommissions: state => {
            return state.form.settings.untilPull * 60;
        },
        primogemsFromWelkinMoon : state => {
            return Math.min(state.form.settings.untilPull, state.form.belongings.welkin) * 90;
        },
        primogemsFromPacks      : state => {
            const packAmount     = state.form.packs;
            const packContent    = state.packs.content;
            const availablePacks = Object.keys(state.form.packs);
            return availablePacks.reduce((a, v) => a + packAmount[v] * packContent[v], 0)
        },
        primogemsAvailable      : (_, getters) => {
            let amount = 0;
            amount += getters.primogems;
            amount += getters.primogemsFromCrystals;
            amount += getters.primogemsFromCommissions;
            amount += getters.primogemsFromWelkinMoon;
            amount += getters.primogemsFromPacks;
            return amount;
        },
        primogemsLeft           : (_, getters) => {
            return getters.primogemsAvailable % 160;
        },
        moneySpentInPacks       : state => {
            const packAmount     = state.form.packs;
            const packPrices     = state.packs.prices[state.packs.region];
            const availablePacks = Object.keys(state.form.packs);
            return availablePacks.reduce((a, v) => a + packAmount[v] * packPrices[v], 0)
        },
        playerPity              : (state, getters) => {
            return getters.pity(getters.wishesTotal, state.form.settings.currentPity)
        },
        playerStarglitter       : (state, getters) => {
            return getters.starglitterFromPity(getters.playerPity);
        },
        wishesFromPrimogems     : (_, getters) => {
            return Math.floor(getters.primogemsAvailable / 160);
        },
        wishesFromStarglitter   : state => {
            return Math.floor(state.form.belongings.starglitter / 5);
        },
        wishesFromStardust      : (state, getters) => {
            const amount = Math.floor(state.form.belongings.stardust / 75);
            let max      = 5 - state.form.settings.wishBought;
            max += getters.monthUntilPull * 5;
            return Math.min(amount, max);
        },
        wishesTotal             : (state, getters) => {
            let amount = 0;
            amount += state.form.belongings.intertwined;
            amount += getters.wishesFromPrimogems;
            amount += getters.wishesFromStarglitter;
            amount += getters.wishesFromStardust;
            return amount;
        },
        inject                  : (_, getters) => (pityData, starglitterData) => {
            const finalPity = {
                min: {
                    min: {
                        four: pityData.min.four,
                        five: pityData.min.five,
                    },
                    max: {
                        four: pityData.max.four,
                        five: pityData.max.five
                    }
                },
                max: {
                    min: {
                        four: pityData.min.four,
                        five: pityData.min.five,
                    },
                    max: {
                        four: pityData.max.four,
                        five: pityData.max.five
                    }
                }
            }

            const bonusWishes = {
                min: 0,
                max: 0,
            }

            let finalStarglitter = {
                min: starglitterData.min,
                max: starglitterData.max
            }

            while (finalStarglitter.min >= 5 || finalStarglitter.max >= 5) {
                // Assured 5* count: pity.min.min.five

                const wishes = {
                    min: Math.floor(finalStarglitter.min / 5),
                    max: Math.floor(finalStarglitter.max / 5)
                }

                bonusWishes.min += wishes.min;
                bonusWishes.max += wishes.max;

                finalStarglitter.min -= wishes.min * 5;
                finalStarglitter.max -= wishes.max * 5;

                const wishPity = {
                    min: getters.pity(wishes.min),
                    max: getters.pity(wishes.max),
                }

                const currentPity = {
                    min: {
                        min: {
                            four: wishPity.min.min.four,
                            five: wishPity.min.min.five,
                        },
                        max: {
                            four: wishPity.min.max.four,
                            five: wishPity.min.max.five,
                        }
                    },
                    max: {
                        min: {
                            four: wishPity.max.min.four,
                            five: wishPity.max.min.five,
                        },
                        max: {
                            four: wishPity.max.max.four,
                            five: wishPity.max.max.five,
                        }
                    }
                }

                const starglitter = {
                    min: getters.starglitterFromPity(wishPity.min).min,
                    max: getters.starglitterFromPity(wishPity.max).max
                }

                finalStarglitter.min += starglitter.min;
                finalStarglitter.max += starglitter.max;

                finalPity.min.min.four += currentPity.min.min.four;
                finalPity.min.min.five += currentPity.min.min.five;
                finalPity.min.max.four += currentPity.min.max.four;
                finalPity.min.max.five += currentPity.min.max.five;
                finalPity.max.min.four += currentPity.max.min.four;
                finalPity.max.min.five += currentPity.max.min.five;
                finalPity.max.max.four += currentPity.max.max.four;
                finalPity.max.max.five += currentPity.max.max.five;
            }

            return {
                pity       : finalPity,
                starglitter: finalStarglitter,
                wishes     : bonusWishes
            }
        }
    },
    mutations: {
        intertwined(state, n) {
            state.form.belongings.intertwined = n;
        },
        starglitter(state, n) {
            state.form.belongings.starglitter = n;
        },
        stardust(state, n) {
            state.form.belongings.stardust = n;
        },
        primogems(state, n) {
            state.form.belongings.primogems = n;
        },
        genesis(state, n) {
            state.form.belongings.genesis = n;
        },
        welkin(state, n) {
            state.form.belongings.welkin = n;
        },
        untilPull(state, n) {
            state.form.settings.untilPull = n;
        },
        wishBought(state, n) {
            state.form.settings.wishBought = n;
        },
        currentPity(state, n) {
            state.form.settings.currentPity = n;
        },
        injectStarglitter(state, b) {
            state.form.settings.injectStarglitter = b;
        },
        packs(state, {pack, n}) {
            state.form.packs[pack] = n;
        }
    },
    actions  : {},
    modules  : {}
})
