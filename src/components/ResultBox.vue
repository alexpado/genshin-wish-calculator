<template>
    <table>
        <tr v-for="res in results" :key="res.key" :class="res.classes">
            <td><span>{{ res.name }}</span></td>
            <td><span>{{ res.value }}</span></td>
        </tr>
    </table>
</template>

<script>
export default {
    name    : "ResultBox",
    computed: {
        // ** <editor-fold desc="Detail Data">
        primogems() {
            return this.$store.getters.primogems;
        },
        primogemsFromCrystals() {
            return this.$store.getters.primogemsFromCrystals;
        },
        primogemsFromCommissions() {
            return this.$store.getters.primogemsFromCommissions;
        },
        primogemsFromWelkinMoon() {
            return this.$store.getters.primogemsFromWelkinMoon;
        },
        primogemsFromPacks() {
            return this.$store.getters.primogemsFromPacks;
        },
        primogemsAvailable() {
            return this.$store.getters.primogemsAvailable;
        },
        primogemsLeft() {
            return this.$store.getters.primogemsLeft;
        },
        moneySpentInPacks() {
            return this.$store.getters.moneySpentInPacks;
        },
        pity() {
            return this.$store.getters.playerPity;
        },
        wishesFromPrimogems() {
            return this.$store.getters.wishesFromPrimogems;
        },
        wishesFromStarglitter() {
            return this.$store.getters.wishesFromStarglitter;
        },
        wishesFromStardust() {
            return this.$store.getters.wishesFromStardust;
        },
        wishesTotal() {
            return this.$store.getters.wishesTotal;
        },
        starglitter() {
            return this.$store.getters.playerStarglitter;
        },
        intertwined() {
            return this.$store.state.form.belongings.intertwined
        },
        currency() {
            return this.$store.state.packs.currency;
        },
        // ** </editor-fold>
        results() {
            const injection = this.$store.getters.inject(this.pity, this.starglitter);

            return [
                {
                    name   : 'Total Wishes',
                    value  : this.wishesTotal,
                    classes: ['white']
                },
                {
                    name   : 'Hard Pity 4*',
                    value  : this.toNumber(this.pity.min.four),
                    classes: ['purple']
                },
                {
                    name   : 'Hard Pity 5*',
                    value  : this.toNumber(this.pity.min.five),
                    classes: ['orange']
                },
                {
                    name   : 'Soft Pity 5*',
                    value  : this.toNumber(this.pity.min.five),
                    classes: ['yellow']
                },
                {
                    name : 'Min Starglitter',
                    value: `+ ${this.starglitter.min}`
                },
                {
                    name : 'Max Starglitter',
                    value: `+ ${this.starglitter.max}`
                },
                {},
                {
                    name : 'Min Starglitter Wishes',
                    value: injection.wishes.min
                },
                {
                    name : 'Max Starglitter Wishes',
                    value: injection.wishes.max
                },
                {
                    name   : 'Min Hard Pity 4*',
                    value  : this.toNumber(injection.pity.min.min.four),
                    classes: ['purple']
                },
                {
                    name   : 'Max Hard Pity 4*',
                    value  : this.toNumber(injection.pity.max.max.four),
                    classes: ['purple']
                },
                {
                    name   : 'Min Hard Pity 5*',
                    value  : this.toNumber(injection.pity.min.min.five),
                    classes: ['orange']
                },
                {
                    name   : 'Max Hard Pity 5*',
                    value  : this.toNumber(injection.pity.max.min.five),
                    classes: ['orange']
                },
                {
                    name   : 'Min Soft Pity 5*',
                    value  : this.toNumber(injection.pity.min.max.five),
                    classes: ['yellow']
                },
                {
                    name   : 'Max Soft Pity 5*',
                    value  : this.toNumber(injection.pity.max.max.five),
                    classes: ['yellow']
                },
                {
                    name : 'Min Starglitter Left',
                    value: injection.starglitter.min
                },
                {
                    name : 'Max Starglitter Left',
                    value: injection.starglitter.min
                },
                {},
                {
                    name : 'Owned',
                    value: `${this.primogems} primogems`
                },
                {
                    name : 'Daily Commissions',
                    value: `${this.primogemsFromCommissions} primogems`
                },
                {
                    name : 'Welkin Moon',
                    value: `${this.primogemsFromWelkinMoon} primogems`
                },
                {
                    name : 'Crystal Exchange',
                    value: `${this.primogemsFromCrystals} primogems`
                },
                {
                    name : 'Pack Purchase',
                    value: `${this.primogemsFromPacks} primogems`
                },
                {
                    name : 'Money Spent',
                    value: this.toCurrency(this.moneySpentInPacks)
                },
                {
                    name   : 'Total Primogems',
                    value  : `${this.primogemsAvailable} primogems`,
                    classes: ['white']
                },
                {
                    name : 'Left After Pulls',
                    value: `${this.primogemsLeft} primogems`
                },
                {},
                {
                    name : 'Owned',
                    value: `${this.intertwined} wishes`
                },
                {
                    name : 'Primogems Exchange',
                    value: `${this.wishesFromPrimogems} wishes`
                },
                {
                    name : 'Starglitter Exchange',
                    value: `${this.wishesFromStarglitter} wishes`,
                },
                {
                    name : 'Stardust Exchange',
                    value: `${this.wishesFromStardust} wishes`
                },
                {
                    name   : 'Total Wishes',
                    value  : `${this.wishesTotal} wishes`,
                    classes: ['white']
                }
            ];
        }
    },
    methods : {
        toCurrency(price) {
            return `${new Intl.NumberFormat(undefined, {
                style   : 'currency',
                currency: this.currency
            }).format(price)}`
        },
        toNumber(price) {
            return `${new Intl.NumberFormat(undefined, {
                style                : 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(price)}`
        },

    }
}
</script>

<style lang="scss" scoped>
table {
    border-spacing: 0;
    width: 100%;

    tr {
        width: 100%;

        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }

        td {
            width: 50%;
            padding: 0.4em 0;

            span {
                display: block;
                padding: 0 0.5em;
                font-size: 0.85em;
                cursor: default;
            }

            &:first-child {
                text-align: right;
            }

            &:first-child span {
                border-right: 1px solid #FF5100;
            }

            &:last-child span {
                border-left: 1px solid #FF5100;
            }
        }

        &.white {
            color: white;
        }

        &.orange {
            color: #ff5100;
        }

        &.yellow {
            color: #ffc800;
        }

        &.purple {
            color: #b300ff;
        }
    }
}
</style>