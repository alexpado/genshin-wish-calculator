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
    banner() {
      return this.$store.getters.activeBanner;
    },
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
    injectionEnabled() {
      return this.$store.state.form.settings.injectStarglitter;
    },
    currency() {
      return this.$store.state.packs.currency;
    },
    // ** </editor-fold>
    results() {
      const injection = this.$store.getters.inject(this.pity, this.starglitter);

      const result = [
        {
          name   : 'Total Wishes',
          value  : this.wishesTotal,
          raw    : this.wishesTotal,
          classes: ['white']
        },
        {
          name   : 'Hard Pity 4*',
          value  : this.toNumber(this.pity.min.four),
          raw    : this.pity.min.four,
          classes: ['purple']
        },
        {
          name   : 'Hard Pity 5*',
          value  : this.toNumber(this.pity.min.five),
          raw    : this.pity.min.five,
          classes: ['orange']
        },
        {
          name   : 'Soft Pity 5*',
          value  : this.toNumber(this.pity.max.five),
          raw    : this.pity.max.five,
          classes: ['yellow']
        },
        {
          name     : 'Starglitter',
          value    : `+ ${this.starglitter.min}`,
          raw      : this.starglitter.min,
          condition: () => !this.banner.minmax
        },
        {
          name     : 'Min Starglitter',
          value    : `+ ${this.starglitter.min}`,
          raw      : this.starglitter.min,
          condition: () => this.banner.minmax
        },
        {
          name     : 'Max Starglitter',
          value    : `+ ${this.starglitter.max}`,
          raw      : this.starglitter.max,
          condition: () => this.banner.minmax
        },
        {},
        {
          name     : 'Starglitter Wishes',
          value    : injection.wishes.min,
          raw      : injection.wishes.min,
          condition: () => this.injectionEnabled && !this.banner.minmax
        },
        {
          name     : 'Min Starglitter Wishes',
          value    : injection.wishes.min,
          raw      : injection.wishes.min,
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Max Starglitter Wishes',
          value    : injection.wishes.max,
          raw      : injection.wishes.max,
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Hard Pity 4*',
          value    : this.toNumber(injection.pity.min.min.four),
          raw      : injection.pity.min.min.four,
          classes  : ['purple'],
          condition: () => this.injectionEnabled && !this.banner.minmax
        },
        {
          name     : 'Min Hard Pity 4*',
          value    : this.toNumber(injection.pity.min.min.four),
          raw      : injection.pity.min.min.four,
          classes  : ['purple'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Max Hard Pity 4*',
          value    : this.toNumber(injection.pity.max.max.four),
          raw      : injection.pity.max.max.four,
          classes  : ['purple'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Hard Pity 5*',
          value    : this.toNumber(injection.pity.min.min.five),
          raw      : injection.pity.min.min.five,
          classes  : ['orange'],
          condition: () => this.injectionEnabled && !this.banner.minmax
        },
        {
          name     : 'Min Hard Pity 5*',
          value    : this.toNumber(injection.pity.min.min.five),
          raw      : injection.pity.min.min.five,
          classes  : ['orange'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Max Hard Pity 5*',
          value    : this.toNumber(injection.pity.max.min.five),
          raw      : injection.pity.max.min.five,
          classes  : ['orange'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Soft Pity 5*',
          value    : this.toNumber(injection.pity.min.max.five),
          raw      : injection.pity.min.max.five,
          classes  : ['yellow'],
          condition: () => this.injectionEnabled && !this.banner.minmax
        },
        {
          name     : 'Min Soft Pity 5*',
          value    : this.toNumber(injection.pity.min.max.five),
          raw      : injection.pity.min.max.five,
          classes  : ['yellow'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Max Soft Pity 5*',
          value    : this.toNumber(injection.pity.max.max.five),
          raw      : injection.pity.max.max.five,
          classes  : ['yellow'],
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Starglitter Left',
          value    : injection.starglitter.min,
          raw      : injection.starglitter.min,
          condition: () => this.injectionEnabled && !this.banner.minmax
        },
        {
          name     : 'Min Starglitter Left',
          value    : injection.starglitter.min,
          raw      : injection.starglitter.min,
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {
          name     : 'Max Starglitter Left',
          value    : injection.starglitter.min,
          raw      : injection.starglitter.min,
          condition: () => this.injectionEnabled && this.banner.minmax
        },
        {},
        {
          name     : 'Owned',
          value    : `${this.primogems} primogems`,
          raw      : this.primogems,
          condition: (v) => v > 0
        },
        {
          name     : 'Daily Commissions',
          value    : `${this.primogemsFromCommissions} primogems`,
          raw      : this.primogemsFromCommissions,
          condition: (v) => v > 0
        },
        {
          name     : 'Welkin Moon',
          value    : `${this.primogemsFromWelkinMoon} primogems`,
          raw      : this.primogemsFromWelkinMoon,
          condition: (v) => v > 0
        },
        {
          name     : 'Crystal Exchange',
          value    : `${this.primogemsFromCrystals} primogems`,
          raw      : this.primogemsFromCrystals,
          condition: (v) => v > 0
        },
        {
          name     : 'Pack Purchase',
          value    : `${this.primogemsFromPacks} primogems`,
          raw      : this.primogemsFromPacks,
          condition: (v) => v > 0
        },
        {
          name     : 'Money Spent',
          value    : this.toCurrency(this.moneySpentInPacks),
          raw      : this.moneySpentInPacks,
          condition: (v) => v > 0
        },
        {
          name     : 'Total Primogems',
          value    : `${this.primogemsAvailable} primogems`,
          raw      : this.primogemsAvailable,
          classes  : ['white'],
          condition: (v) => v > 0
        },
        {
          name     : 'Left After Pulls',
          value    : `${this.primogemsLeft} primogems`,
          raw      : this.primogemsLeft,
          condition: (v) => v > 0
        },
        {},
        {
          name     : 'Owned',
          value    : `${this.intertwined} wishes`,
          raw      : this.intertwined,
          condition: (v) => v > 0
        },
        {
          name     : 'Primogems Exchange',
          value    : `${this.wishesFromPrimogems} wishes`,
          raw      : this.wishesFromPrimogems,
          condition: (v) => v > 0
        },
        {
          name     : 'Starglitter Exchange',
          value    : `${this.wishesFromStarglitter} wishes`,
          raw      : this.wishesFromStarglitter,
          condition: (v) => v > 0
        },
        {
          name     : 'Stardust Exchange',
          value    : `${this.wishesFromStardust} wishes`,
          raw      : this.wishesFromStardust,
          condition: (v) => v > 0
        },
        {
          name     : 'Total Wishes',
          value    : `${this.wishesTotal} wishes`,
          raw      : this.wishesTotal,
          classes  : ['white'],
          condition: (v) => v > 0
        }
      ];

      return result.filter(i => {
        // eslint-disable-next-line no-prototype-builtins
        if (i.hasOwnProperty('condition')) {
          return i.condition(i.raw);
        }
        return true;
      });
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