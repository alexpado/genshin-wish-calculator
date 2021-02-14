<template>
    <div id="app">
        <router-view/>
    </div>
</template>

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
