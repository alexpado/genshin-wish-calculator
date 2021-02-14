<template>
    <div class="scrollable">
        <div class="section">
            <h2>Hi !</h2>
            <div class="take-me-back">
                <router-link class="orange" to="/">
                    <ArrowLeftIcon class="icon" size="20"/>
                    <span>Take me back !</span>
                </router-link>
            </div>
            <div class="content">
                <p>
                    This is the help and information section. Here you can see how this tool is working and how to use
                    it.
                </p>
                <p>
                    If you have any question, feature request or bug report, do not hesitate to contact me through
                    Twitter or GitHub.
                </p>
            </div>
        </div>
        <hr>
        <div class="section">
            <h2>About the pity</h2>
            <div class="content">
                <p>
                    To make things clear, <span class="white">the pity displayed is not your probability, but your
                    progress toward the pity</span>.
                </p>
                <p>
                    For example, if you have <span class="orange">{{ toNumber(0.75) }}</span> as pity, it doesn't mean
                    that you have <span class="orange">75%</span> chances to get your pity at the next pull, but rather
                    that you need still <span class="yellow">25%</span> to get to the pity.
                </p>
                <p>
                    In other words:
                    <span class="white">The pity displayed here is linear, the probabilities aren't.</span>
                </p>
            </div>
        </div>
        <hr>
        <div class="section">
            <h2>The fields</h2>
            <div class="content">
                <p>
                    Here is a list of fields and how they interact with the calculations. Every field can be toggled by
                    clicking its image or circle. Once disabled, it will count as 0 until re-enabled. You can't edit a
                    disabled field.
                </p>
                <p>
                    <span class="orange">
                        Intertwined Fate:
                    </span>
                    This is the amount of intertwined fates that you have in your possession, and that you want to use
                    during pulls. You can use your Acquaint Fate amount, that doesn't really matter.
                </p>
                <p>
                    <span class="orange">
                        Starglitter:
                    </span>
                    This is the amount of starglitters that you have in your possession, and that you want to use during
                    pulls. Every starglitters will be converted into wishes (5 per wishes).
                </p>
                <p>
                    <span class="orange">
                        Stardust:
                    </span>
                    This is the amount of stardusts that you have in your possession, and that you want to use during
                    pulls. Every stardusts will be converted into wishes (75 per wishes, max 5).
                </p>
                <p>
                    <span class="orange">
                        Primogems:
                    </span>
                    This is the amount of primogems that you have in your possession, and that you want to use during
                    pulls. Every primogems will be converted into wishes (160 per wishes).
                </p>
                <p>
                    <span class="orange">
                        Genesis Crystal:
                    </span>
                    This is the amount of genesis crystals that you have in your possession, and that you want to use
                    during pulls. Every genesis crystal will be converted into primogems (1 for 1). Generated primogems
                    will be then used in the same way as regular primogems.
                </p>
                <p>
                    <span class="orange">
                        Welkin Moon:
                    </span>
                    This is the number of days you still have for your
                    <span class="white">Blessing of the Welkin Moon</span>. This will count toward daily primogems
                    earnings alongside daily commissions rewards if you set the number of days until you wish to pull.
                </p>
                <p>
                    <span class="orange">
                        Days Until Pull:
                    </span>
                    This is the number of days you want to wait until pulling. This will affect
                    <span class="white">Stardust Exchange</span>, <span class="white">Daily Commissions Rewards</span>
                    and the <span class="white">Blessing of the Welkin Moon daily bonus</span>.
                </p>
                <p>
                    <span class="orange">
                        Stardust Wishes:
                    </span>
                    This is the number of wishes you already bought in the <span class="white">Paimon's Bargains</span>
                    shop this month, as you can only exchange 5 wishes per month in this way.
                </p>
                <p>
                    <span class="orange">
                        Current Pity:
                    </span>
                    This is the number of wishes you already made on the targeted banner since the last 5* drop.
                </p>
                <p>
                    <span class="orange">
                        Reuse Starglitter:
                    </span>
                    Enabling this will exchange starglitters obtained from pulling until the exchange is not
                    possible anymore.
                </p>
                <p>
                    <span class="orange">
                        Packs:
                    </span>
                    For the brave (or the whales).
                </p>
            </div>
        </div>
        <hr>
        <div class="section">
            <h5>Made with 💞 by <span class="orange">Akio Nakao#0001</span></h5>
        </div>
    </div>
</template>

<script>
import {ArrowLeftIcon} from 'vue-feather-icons'

export default {
    name      : 'About',
    components: {ArrowLeftIcon},
    methods   : {
        toNumber(number) {
            return `${new Intl.NumberFormat(undefined, {
                style                : 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(number)}`
        },
    }
}
</script>

<style lang="scss" scoped>

.section {
    padding: 1em;
    font-size: 0.8em;

    .take-me-back {
        padding-top: 1em;
        display: flex;
        text-align: center;
        justify-content: center;
        position: static;
        top: 0;

        a {
            display: flex;
            text-decoration: none;

            .icon {
                margin: auto 8px auto 0;
            }

            span {
                margin: auto;
            }
        }

    }

    h2, h5 {
        color: white;
        text-align: center;
    }

    .content {
        padding-top: 1em;
        text-align: justify;

        p {
            margin: 1em 0;
            line-height: 1.6em;
        }
    }

    .white {
        color: white;
    }

    .orange {
        color: #ff5100;
    }

    .yellow {
        color: #ffc800;
    }

    .purple {
        color: #b300ff;
    }

}
</style>