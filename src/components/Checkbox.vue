<template>
  <div :class="{enabled: value}" class="numeric-input">
    <div class="input-icon">
      <DivToggle :value="value" @input="e => $emit('input', e)"/>
    </div>
    <label class="input-label">
      <span>{{ value ? labelOn : labelOff }}</span>
    </label>
  </div>
</template>

<script>

import DivToggle from "@/components/toggles/DivToggle";

export default {
  name: "Checkbox",
  components: {DivToggle},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    labelOn: {
      type: String,
      required: true
    },
    labelOff: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.numeric-input.enabled {
  background-color: #262626;
}

.numeric-input.enabled span {
  color: white;
}

.numeric-input {
  height: 44px;
  width: auto;
  display: flex;

  background-color: #161616;
  border-radius: 38px;
  box-sizing: border-box;
}

.input-label {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.input-label span {
  margin: auto 0;
  font-size: 0.85em;
}

.input-icon {
  width: 20px;
  height: 20px;
  display: flex;
  margin: auto 8px;
}

</style>