<template>
    <div id="app">
        <div class="scrollable">
            <div id="belongings" class="input-grid">
                <div class="input">
                    <NumericInputIcon
                        v-model="formIntertwined"
                        :enabled="true"
                        :image="require('@/assets/img/intertwined_fate.png')"
                        :label="'Intertwined fate'"
                    />
                </div>
                <div class="input">
                    <NumericInputIcon
                        v-model="formStarglitter"
                        :enabled="true"
                        :image="require('@/assets/img/masterless_starglitter.png')"
                        :label="'Starglitter'"
                    />
                </div>
                <div class="input">
                    <NumericInputIcon
                        v-model="formStardust"
                        :enabled="true"
                        :image="require('@/assets/img/masterless_stardust.png')"
                        :label="'Stardust'"
                    />
                </div>
                <div class="input">
                    <NumericInputIcon
                        v-model="formPrimogems"
                        :enabled="true"
                        :image="require('@/assets/img/primogem.png')"
                        :label="'Primogems'"
                    />
                </div>
                <div class="input">
                    <NumericInputIcon
                        v-model="formGenesis"
                        :enabled="true"
                        :image="require('@/assets/img/genesis_crystal.png')"
                        :label="'Genesis Crystals'"
                    />
                </div>
                <div class="input">
                    <NumericInputIcon
                        v-model="formWelkin"
                        :enabled="true"
                        :image="require('@/assets/img/welkin.png')"
                        :label="'Welkin Moon'"
                    />
                </div>
            </div>
            <hr>
            <div id="settings" class="input-grid">
                <div class="input">
                    <NumericInputToggle
                        v-model="formUntilPull"
                        :enabled="false"
                        :label="'Days Until Pull'"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formWishBought"
                        :enabled="false"
                        :label="'Stardust Wishes'"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formCurrentPity"
                        :enabled="false"
                        :label="'Current Pity'"
                    />
                </div>
                <div class="input">
                    <Checkbox
                        v-model="formInjectStarglitter"
                        :enabled="false"
                        :label-off="'Reuse Starglitter'"
                        :label-on="'Reuse Starglitter'"
                    />
                </div>
            </div>
            <hr>
            <div id="packs" class="input-grid">
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack1"
                        :enabled="false"
                        :label="packLabel(packPrice1, pack1)"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack2"
                        :enabled="false"
                        :label="packLabel(packPrice2, pack2)"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack3"
                        :enabled="false"
                        :label="packLabel(packPrice3, pack3)"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack4"
                        :enabled="false"
                        :label="packLabel(packPrice4, pack4)"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack5"
                        :enabled="false"
                        :label="packLabel(packPrice5, pack5)"
                    />
                </div>
                <div class="input">
                    <NumericInputToggle
                        v-model="formPack6"
                        :enabled="false"
                        :label="packLabel(packPrice6, pack6)"
                    />
                </div>
            </div>
            <hr>
            <div class="results">
                <ResultBox/>
            </div>
        </div>
    </div>
</template>

<script>
import NumericInputIcon   from "@/components/inputs/NumericInputIcon";
import NumericInputToggle from "@/components/inputs/NumericInputToggle";
import Checkbox           from "@/components/inputs/Checkbox";
import ResultBox          from "@/components/ResultBox";

export default {
    name      : 'App',
    components: {ResultBox, Checkbox, NumericInputToggle, NumericInputIcon},
    computed  : {
        // ** <editor-fold desc="Form Properties">
        formIntertwined      : {
            get() {
                return this.$store.state.form.belongings.intertwined;
            },
            set(v) {
                this.$store.commit('intertwined', v);
            }
        },
        formStarglitter      : {
            get() {
                return this.$store.state.form.belongings.starglitter;
            },
            set(v) {
                this.$store.commit('starglitter', v);
            }
        },
        formStardust         : {
            get() {
                return this.$store.state.form.belongings.stardust;
            },
            set(v) {
                this.$store.commit('stardust', v);
            }
        },
        formPrimogems        : {
            get() {
                return this.$store.state.form.belongings.primogems;
            },
            set(v) {
                this.$store.commit('primogems', v);
            }
        },
        formGenesis          : {
            get() {
                return this.$store.state.form.belongings.genesis;
            },
            set(v) {
                this.$store.commit('genesis', v);
            }
        },
        formWelkin           : {
            get() {
                return this.$store.state.form.belongings.welkin;
            },
            set(v) {
                this.$store.commit('welkin', v);
            }
        },
        formUntilPull        : {
            get() {
                return this.$store.state.form.settings.untilPull;
            },
            set(v) {
                this.$store.commit('untilPull', v);
            }
        },
        formWishBought       : {
            get() {
                return this.$store.state.form.settings.wishBought;
            },
            set(v) {
                this.$store.commit('wishBought', v);
            }
        },
        formCurrentPity      : {
            get() {
                return this.$store.state.form.settings.currentPity;
            },
            set(v) {
                this.$store.commit('currentPity', v);
            }
        },
        formInjectStarglitter: {
            get() {
                return this.$store.state.form.settings.injectStarglitter;
            },
            set(v) {
                this.$store.commit('injectStarglitter', v);
            }
        },
        formPack1            : {
            get() {
                return this.$store.state.form.packs.pack1;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack1', n: v});
            }
        },
        formPack2            : {
            get() {
                return this.$store.state.form.packs.pack2;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack2', n: v});
            }
        },
        formPack3            : {
            get() {
                return this.$store.state.form.packs.pack3;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack3', n: v});
            }
        },
        formPack4            : {
            get() {
                return this.$store.state.form.packs.pack4;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack4', n: v});
            }
        },
        formPack5            : {
            get() {
                return this.$store.state.form.packs.pack5;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack5', n: v});
            }
        },
        formPack6            : {
            get() {
                return this.$store.state.form.packs.pack6;
            },
            set(v) {
                this.$store.commit('packs', {pack: 'pack6', n: v});
            }
        },
        // ** </editor-fold>
        // ** <editor-fold desc="Pack Meta">
        pack1() {
            return this.$store.state.packs.content.pack1;
        },
        pack2() {
            return this.$store.state.packs.content.pack2;
        },
        pack3() {
            return this.$store.state.packs.content.pack3;
        },
        pack4() {
            return this.$store.state.packs.content.pack4;
        },
        pack5() {
            return this.$store.state.packs.content.pack5;
        },
        pack6() {
            return this.$store.state.packs.content.pack6;
        },
        packPrice1() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack1;
        },
        packPrice2() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack2;
        },
        packPrice3() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack3;
        },
        packPrice4() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack4;
        },
        packPrice5() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack5;
        },
        packPrice6() {
            return this.$store.state.packs.prices[this.$store.state.packs.region].pack6;
        },
        currency() {
            return this.$store.state.packs.currency;
        },
        // ** </editor-fold>
    },
    methods   : {
        packLabel(price, primo) {
            return `${this.toCurrency(price)} (${primo})`
        },
        toCurrency(price) {
            return `${new Intl.NumberFormat(undefined, {
                style   : 'currency',
                currency: this.currency
            }).format(price)}`
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

    &::-webkit-scrollbar {
        display: block;
        background-color: #262626;
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ff5100;
        border: 1px solid #262626;
    }
}

.input-grid {
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;

    .input {
        flex-basis: 48%;
        padding: 4px 0;
        box-sizing: border-box;
    }
}

hr {
    background-color: #FF5100;
    height: 2px;
    width: 20%;
    border: none;
    margin: 16px auto;
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
