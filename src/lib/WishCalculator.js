export const calc = {
    primogems: {
        fromCrystal(crystal) {
            return crystal;
        },
        fromDailies(days) {
            return days * 60;
        },
        fromWelkin(days, welkin) {
            return Math.min(days, welkin) * 90;
        },
        fromPacks(packs) {
            let amount = 0;
            Object.keys(packs).forEach(key => {
                const pack = packs[key];
                amount += (pack.primo + pack.bonus) * pack.value;
            });
            return amount;
        },
        leftAfterPull(primogems) {
            return primogems % 160;
        }
    },
    money: {
        fromPacks(packs) {
            let amount = 0;
            Object.keys(packs).forEach(key => {
                const pack = packs[key];
                amount += pack.price * pack.value;
            });
            return amount;
        }
    },
    pity: {
        getPityRates(wishes, pity) {
            return {
                min: {
                    four: (wishes + (pity % 10)) / 10,
                    five: (wishes + (pity % 90)) / 90
                },
                max: {
                    four: (wishes + (pity % 10)) / 10,
                    five: (wishes + (pity)) / 75
                }
            }
        }
    },
    wishes: {
        fromPrimogems(primo) {
            return Math.floor(primo / 160);
        },
        fromStarglitter(starglitter) {
            return Math.floor(starglitter / 5);
        },
        fromStardust(stardust, days, alreadyBought) {
            if (stardust === 0) return 0;
            const amount = Math.floor(stardust / 75);
            let max = 5 - alreadyBought;
            max += calc.misc.getMonthCount(days) * 5;
            return Math.min(amount, max);
        }
    },
    starglitter: {
        fromWishes(wishes) {
            return calc.starglitter.fromPityRate(calc.pity.getPityRates(wishes, 0))
        },
        fromPityRate(rate) {
            return {
                min: Math.max((Math.floor(rate.min.four - 3) * 2) + (Math.floor(rate.min.five) * 10), 0),
                max: (Math.floor(rate.max.four) * 5) + (Math.floor(rate.max.five) * 25)
            }
        }
    },
    misc: {
        doStarglitterInjection(pityData, starglitterData) {
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
                    min: calc.wishes.fromStarglitter(finalStarglitter.min),
                    max: calc.wishes.fromStarglitter(finalStarglitter.max)
                }

                bonusWishes.min += wishes.min;
                bonusWishes.max += wishes.max;

                finalStarglitter.min -= wishes.min * 5;
                finalStarglitter.max -= wishes.max * 5;

                const wishPity = {
                    min: calc.pity.getPityRates(wishes.min, 0),
                    max: calc.pity.getPityRates(wishes.max, 0),
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
                    min: calc.starglitter.fromPityRate(wishPity.min).min,
                    max: calc.starglitter.fromPityRate(wishPity.max).max
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
                pity: finalPity,
                starglitter: finalStarglitter,
                wishes: bonusWishes
            }

        },
        getMonthCount(days) {
            const date = new Date();

            let start = {
                month: date.getMonth(),
                year: date.getFullYear()
            };

            date.setDate(date.getDate() + days);

            let end = {
                month: date.getMonth(),
                year: date.getFullYear()
            };

            return 12 * (end.year - start.year) + (end.month - start.month);
        },

    }
}