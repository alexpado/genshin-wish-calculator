<template>
  <div :class="{enabled: state}" class="numeric-input">
    <div class="input-icon">
      <DivToggle v-model="state"/>
    </div>
    <label class="input-label">
      <span v-if="label.length > 0">{{ label }}</span>
      <input :disabled="!state" :readonly="!state" :value="value" max="9999999" min="0" type="number" @input="handle">
    </label>
  </div>
</template>

<script>

import DivToggle from "@/components/toggles/DivToggle";

export default {
  name: "NumericInputToggle",
  components: {DivToggle},
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: this.enabled,
      retainedValue: this.value
    }
  },
  methods: {
    handle(event) {
      const v = event.target.value;

      if (v.length === 0) {
        this.$emit('input', 0);
      } else {
        this.$emit('input', Math.min(Math.max(parseInt(v), 0), 9999999));
      }
    }
  },
  watch: {
    value(val) {
      if (this.state) {
        this.retainedValue = val;
      }
    },
    state(val) {
      if (val) {
        this.$emit('input', this.retainedValue);
      } else {
        this.$emit('input', 0);
      }
    }
  }
}
</script>

<style scoped>

.numeric-input.enabled {
  background-color: #262626;
}

.numeric-input.enabled input {
  color: white;
}

.numeric-input {
  height: 44px;
  width: auto;
  display: flex;

  background-color: #161616;
  border-radius: 44px;
  box-sizing: border-box;
}

.input-label {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.input-label span {
  font-size: 0.8em;
  padding-top: 4px
}

.input-label input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  color: #969696;
  font-size: 1em;
  width: 100%;
}

.input-label input:focus {
  outline: none;
}

.input-label input[readonly] {
  cursor: default;
}

.input-icon {
  flex: 0 0 20px;
  height: 20px;
  display: flex;
  margin: auto 8px;
}

</style>