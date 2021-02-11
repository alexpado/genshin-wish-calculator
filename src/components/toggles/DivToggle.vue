<template>
  <div :class="{active: value}" class="toggle-div" @click="$emit('input', !value)">
  </div>
</template>

<script>
export default {
  name: "DivToggle",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.toggle-div {
  flex-grow: 1;
  border-radius: 50px;
  border: 2px solid #969696;
  cursor: pointer;
}

.toggle-div.active {
  background-color: #FF5100;
  border-color: #FF5100;
}

</style>