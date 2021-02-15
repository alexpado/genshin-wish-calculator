<template>
    <div class="scrollable">
        <div id="banner" class="input-full">
            <div class="input">
                <Dropdown v-model="formBanner" :items="banners" label="Banner"/>
            </div>
        </div>
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
        <!-- Social -->
        <div id="social" class="icon-list">
            <a class="icon" href="https://github.com/alexpado/genshin-wish-calculator" target="_blank">
                <GithubIcon size="20"/>
            </a>
            <a class="icon" href="https://twitter.com/alexpado08" target="_blank">
                <TwitterIcon size="20"/>
            </a>
            <router-link class="icon" to="/about">
                <HelpCircleIcon size="20"/>
            </router-link>

        </div>
        <!-- / -->
        <hr>
        <div class="results">
            <ResultBox/>
        </div>
    </div>
</template>

<script>
import NumericInputIcon                          from "@/components/inputs/NumericInputIcon";
import NumericInputToggle                        from "@/components/inputs/NumericInputToggle";
import Checkbox                                  from "@/components/inputs/Checkbox";
import ResultBox                                 from "@/components/ResultBox";
import {GithubIcon, HelpCircleIcon, TwitterIcon} from 'vue-feather-icons'
import Dropdown                                  from "@/components/inputs/Dropdown";

export default {
    name      : 'Home',
    components: {
        Dropdown,
        ResultBox, Checkbox, NumericInputToggle, NumericInputIcon, GithubIcon, TwitterIcon, HelpCircleIcon
    },
    computed  : {
        banners() {
            return this.$store.getters.availableBanner;
        },
        // ** <editor-fold desc="Form Properties">
        formBanner           : {
            get() {
                return this.$store.state.form.banner
            },
            set(v) {
                this.$store.commit('banner', v);
            }
        },
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

.input-full {
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;

    .input {
        flex-basis: 98%;
        padding: 4px 0;
        box-sizing: border-box;
    }
}

.icon-list {
    display: flex;
    justify-content: space-around;

    .icon {
        height: 44px;
        width: 44px;
        border-radius: 44px;
        background-color: #161616;
        display: flex;

        .feather {
            color: #969696;
            margin: auto;
        }

        &:hover {
            background-color: #262626;

            .feather {
                color: white;
            }
        }
    }
}
</style>
