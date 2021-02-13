<template>
    <div :class="{active: value}" class="toggle-image" @click="$emit('input', !value)">
        <img :src="image" alt=""/>
    </div>
</template>

<script>
export default {
    name : "ImageToggle",
    props: {
        value: {
            type    : Boolean,
            required: true
        },
        image: {
            type    : String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

.toggle-image {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;

    img {
        filter: grayscale(1);
    }

    &.active img {
        filter: grayscale(0);
        
    }
}

</style>