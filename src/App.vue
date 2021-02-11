<template>
  <div id="app">
    <div class="scrollable">
      <div class="input-grid">
        <div v-for="key in Object.keys(storage)" :key="key" class="input">
          <NumericInputIcon v-model="storage[key].value" :enabled="storage[key].enabled" :image="storage[key].image"
                            :label="storage[key].label"/>
        </div>
      </div>
      <hr>
      <div class="input-grid">
        <div v-for="key in Object.keys(setting)" :key="key" class="input">
          <NumericInputToggle v-model="setting[key].value" :enabled="setting[key].enabled" :label="setting[key].label"/>
        </div>
        <div v-for="key in Object.keys(toggleable)" :key="key" class="input">
          <Checkbox v-model="toggleable[key].value" :enabled="toggleable[key].enabled"
                    :label-off="toggleable[key].labels.off"
                    :label-on="toggleable[key].labels.on"/>
        </div>
      </div>
      <hr>
      <div class="input-grid">
        <div v-for="key in Object.keys(packs)" :key="key" class="input">
          <NumericInputToggle v-model="packs[key].value" :enabled="packs[key].enabled" :label="packLabel(packs[key])"/>
        </div>
      </div>
      <hr>
      <div class="results">
        <table>
          <tr v-for="res in results" :key="res.key" :class="res.classes">
            <td><span>{{ res.name }}</span></td>
            <td><span>{{ res.value }}</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {calc} from '@/lib/WishCalculator';
import NumericInputIcon from "@/components/NumericInputIcon";
import NumericInputToggle from "@/components/NumericInputToggle";
import Checkbox from "@/components/Checkbox";

export default {
  name: 'App',
  components: {Checkbox, NumericInputToggle, NumericInputIcon},
  computed: {
    results() {
      let results = [];

      const primo = this.storage.primo.value;
      const dailyCommissions = calc.primogems.fromDailies(this.setting.untilPull.value);
      const welkinMoon = calc.primogems.fromWelkin(this.setting.untilPull.value, this.storage.welkin.value);
      const crystalExchange = calc.primogems.fromCrystal(this.storage.genesis.value);
      const packPrimo = calc.primogems.fromPacks(this.packs);
      const packMoney = calc.money.fromPacks(this.packs);
      const totalPrimo = primo + dailyCommissions + welkinMoon + crystalExchange + packPrimo;
      const leftAfter = calc.primogems.leftAfterPull(totalPrimo);

      const wishes = this.storage.intertwined.value;
      const primoWishes = calc.wishes.fromPrimogems(totalPrimo);
      const starglitterExchange = calc.wishes.fromStarglitter(this.storage.starglitter.value);
      const stardustExchange = calc.wishes.fromStardust(this.storage.stardust.value, this.setting.untilPull.value, this.setting.wishBought.value)
      const totalWishes = wishes + primoWishes + starglitterExchange + stardustExchange;

      const pity = calc.pity.getPityRates(totalWishes, this.setting.currentPity.value);
      const starglitter = calc.starglitter.fromWishes(totalWishes);

      results.push({
        name: 'Total Wishes',
        value: `${totalWishes}`,
        classes: ['white']
      });

      results.push({
        name: 'Hard Pity 4*',
        value: `${new Intl.NumberFormat('fr-FR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(pity.min.four)}`,
        classes: ['purple']
      });

      results.push({
        name: 'Hard Pity 5*',
        value: `${new Intl.NumberFormat('fr-FR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(pity.min.five)}`,
        classes: ['orange']
      });

      results.push({
        name: 'Soft Pity 5*',
        value: `${new Intl.NumberFormat('fr-FR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(pity.max.five)}`,
        classes: ['yellow']
      });

      results.push({
        name: 'Min Starglitter',
        value: `+ ${starglitter.min}`
      });

      results.push({
        name: 'Max Starglitter',
        value: `+ ${starglitter.max}`
      });

      if (this.toggleable.starglitter.value) {
        results.push({});

        const reinjection = calc.misc.doStarglitterInjection(pity, starglitter);

        results.push({
          name: 'Min Starglitter wishes',
          value: `${reinjection.wishes.min} wishes`
        });

        results.push({
          name: 'Max Starglitter wishes',
          value: `${reinjection.wishes.max} wishes`
        });

        results.push({
          name: 'Min Hard Pity 4*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.min.min.four)}`,
          classes: ['purple']
        });

        results.push({
          name: 'Max Hard Pity 4*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.max.max.four)}`,
          classes: ['purple']
        });

        results.push({
          name: 'Min Hard Pity 5*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.min.min.five)}`,
          classes: ['orange']
        });

        results.push({
          name: 'Max Hard Pity 5*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.max.min.five)}`,
          classes: ['orange']
        });

        results.push({
          name: 'Min Soft Pity 5*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.min.max.five)}`,
          classes: ['yellow']
        });

        results.push({
          name: 'Max Soft Pity 5*',
          value: `${new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(reinjection.pity.max.max.five)}`,
          classes: ['yellow']
        });

        results.push({
          name: 'Min Starglitter left',
          value: `${reinjection.starglitter.min}`,
        });

        results.push({
          name: 'Max Starglitter left',
          value: `${reinjection.starglitter.max}`,
        });

      }

      results.push({});

      if (primo > 0) {
        results.push({
          name: 'Owned',
          value: `${primo} primogems`
        });
      }

      if (dailyCommissions > 0) {
        results.push({
          name: 'Daily Commissions',
          value: `${dailyCommissions} primogems`
        });
      }

      if (welkinMoon > 0) {
        results.push({
          name: 'Welkin Moon',
          value: `${welkinMoon} primogems`,
        });
      }

      if (crystalExchange > 0) {
        results.push({
          name: 'Crystal Exchange',
          value: `${crystalExchange} primogems`,
        });
      }

      if (packPrimo > 0) {
        results.push({
          name: 'Packs Purchase',
          value: `${packPrimo} primogems`,
        });
      }

      if (packMoney > 0) {
        results.push({
          name: 'Money Spent',
          value: `${new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(packMoney)}`
        });
      }

      if (totalPrimo > 0) {
        results.push({
          name: 'Total',
          value: `${totalPrimo} primogems`,
          classes: ['white']
        });
      }

      if (leftAfter > 0) {
        results.push({
          name: 'Left After Pulls',
          value: `${leftAfter} primogems`
        });
      }

      if (results[results.length - 1].name) {
        results.push({});
      }

      if (wishes > 0) {
        results.push({
          name: 'Owned',
          value: `${wishes} wishes`,
        });
      }

      if (primoWishes > 0) {
        results.push({
          name: 'Primogems Exchange',
          value: `${primoWishes} wishes`,
        });
      }

      if (starglitterExchange > 0) {
        results.push({
          name: 'Starglitter Exchange',
          value: `${starglitterExchange} wishes`,
        });
      }

      if (stardustExchange > 0) {
        results.push({
          name: 'Stardust Exchange',
          value: `${stardustExchange} wishes`,
        });
      }

      if (totalWishes > 0) {
        results.push({
          name: 'Total',
          value: `${totalWishes} wishes`,
          classes: ['white']
        });
      }

      return results;
    }
  },
  data() {
    return {
      storage: {
        intertwined: {
          label: 'Intertwined fate',
          image: require('@/assets/img/intertwined_fate.png'),
          value: 0,
          enabled: true
        },
        starglitter: {
          label: 'Starglitter',
          image: require('@/assets/img/masterless_starglitter.png'),
          value: 0,
          enabled: true
        },
        stardust: {
          label: 'Stardust',
          image: require('@/assets/img/masterless_stardust.png'),
          value: 0,
          enabled: true
        },
        primo: {
          label: 'Primogems',
          image: require('@/assets/img/primogem.png'),
          value: 0,
          enabled: true
        },
        genesis: {
          label: 'Crystals',
          image: require('@/assets/img/genesis_crystal.png'),
          value: 0,
          enabled: true
        },
        welkin: {
          label: 'Welkin Moon',
          image: require('@/assets/img/welkin.png'),
          value: 0,
          enabled: true
        }
      },
      setting: {
        untilPull: {
          label: 'Days until pull',
          value: 0,
          enabled: false
        },
        wishBought: {
          label: 'Stardust Wishes',
          value: 0,
          enabled: false
        },
        currentPity: {
          label: 'Current Pity',
          value: 0,
          enabled: false
        }
      },
      toggleable: {
        starglitter: {
          value: false,
          labels: {
            on: 'Reuse Starglitter',
            off: 'Reuse Starglitter'
          },
          enabled: false
        }
      },
      packs: {
        pack1: {
          primo: 60,
          bonus: 0,
          price: 1.09,
          value: 0,
          enabled: false
        },
        pack2: {
          primo: 300,
          bonus: 30,
          price: 5.49,
          value: 0,
          enabled: false
        },
        pack3: {
          primo: 980,
          bonus: 110,
          price: 16.99,
          value: 0,
          enabled: false
        },
        pack4: {
          primo: 1980,
          bonus: 260,
          price: 32.99,
          value: 0,
          enabled: false
        },
        pack5: {
          primo: 3280,
          bonus: 600,
          price: 54.99,
          value: 0,
          enabled: false
        },
        pack6: {
          primo: 6480,
          bonus: 1600,
          price: 109.99,
          value: 0,
          enabled: false
        },
      },
    };
  },
  methods: {
    packLabel(pack) {
      return `${new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(pack.price)} (${pack.primo + pack.bonus})`
    }
  }
};
</script>

<style lang="scss">

@font-face {
  font-family: 'GenshinImpact';
  src: url('./assets/fonts/genshin-min.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  font-family: GenshinImpact, Roboto, sans-serif;
  margin: 0;
  padding: 0;
}

body {
  background-color: #131313;
  display: flex;
  height: 100vh;
  width: 100vw;
}

@keyframes bgscroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@media screen and (min-width: 440px) {
  body::before {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('~@/assets/img/webbg.jpg');
    background-repeat: repeat-x;
    background-position: 0 0;
    background-size: cover;
    z-index: -1;

    opacity: 0.2;
    filter: blur(5px);

    animation: 500s linear infinite alternate bgscroll;
  }
}

#app {
  background-color: #0E0E0E;
  border-left: 8px solid #262626;
  color: #969696;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 auto;
  max-width: 440px;
}

.scrollable {
  max-width: 440px;
  overflow-y: scroll;
  flex-grow: 1;
  padding: 8px 4px;
  box-sizing: content-box;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #ff5100 #262626;
}

.scrollable::-webkit-scrollbar {
  display: block;
  background-color: #262626;
  width: 8px;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #ff5100;
  border: 1px solid #262626;
}


.input-grid {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.input-grid .input {
  flex-basis: 48%;
  padding: 4px 0;
  box-sizing: border-box;
}

.input-column .input {
  padding: 4px;
  box-sizing: content-box;
}

hr {
  background-color: #FF5100;
  height: 2px;
  width: 20%;
  border: none;
  margin: 16px auto;
}

table {
  border-spacing: 0;
}

table, tr {
  width: 100%;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

table tr td {
  width: 50%;
  padding: 0.4em 0;
}

table tr td span {
  display: block;
  padding: 0 0.5em;
  font-size: 0.85em;
  cursor: default;
}

tr.white {
  color: white;
}

tr.orange {
  color: #ff5100;
}

tr.yellow {
  color: #ffc800;
}

tr.purple {
  color: #b300ff;
}

table tr td:first-child {
  text-align: right;
}

table tr td:first-child span {
  border-right: 1px solid #FF5100;
}

table tr td:last-child span {
  border-left: 1px solid #FF5100;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
