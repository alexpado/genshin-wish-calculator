<template>
  <div v-click-outside="hide" class="select-input">
    <div class="input-icon" @click="shown = !shown">
      <ChevronDownIcon class="icon" size="20"/>
    </div>
    <label class="input-label" @click="shown = !shown">
      <span v-if="label.length > 0">{{ label }}</span>
      <input :value="valueLabel" disabled readonly type="text">
    </label>
    <div :class="{shown: shown}" class="dropdown">
      <div v-for="item in items" :key="item.key" :class="{active: item.key === value}" class="dropdown-item"
           @click="select(item)">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {ChevronDownIcon} from 'vue-feather-icons'
import vClickOutside     from "v-click-outside";

export default {
  name      : "Dropdown",
  components: {ChevronDownIcon},
  directives: {
    clickOutside: vClickOutside.directive,
  },

  props   : {
    label: {
      required: true,
      type    : String
    },
    items: {
      required: false,
      default : []
    },
    value: {
      required: true,
      type    : String
    }
  },
  computed: {
    valueLabel() {
      return this.items.filter(item => item.key === this.value)[0].label;
    }
  },
  data() {
    return {
      shown: false
    }
  },
  methods: {
    handle(value) {
      this.$emit('input', value);
    },
    select(item) {
      this.shown = false;
      this.handle(item.key);
    },
    hide() {
      this.shown = false
    }
  }
}
</script>

<style lang="scss" scoped>

.select-input {
  height: 44px;
  display: flex;
  cursor: pointer;
  position: relative;

  background-color: #262626;
  border-radius: 44px;
  box-sizing: border-box;


  .input-label {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 99;

    span {
      font-size: 0.8em;
      padding-top: 4px
    }

    input {
      flex-grow: 1;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1em;
      width: 100%;
      cursor: pointer;

      &:focus {
        outline: none
      }
    }
  }

  .input-icon {
    width: 26px;
    height: 26px;
    display: flex;
    margin: auto 4px;
    z-index: 99;

    .icon {
      margin: auto;
    }
  }

  .dropdown {
    overflow: hidden;
    position: absolute;
    background-color: #262626;
    top: 44px;
    left: 26px;
    right: 26px;
    z-index: 98;
    transform: scaleY(0);
    transform-origin: 0 0;
    transition: 0.1s ease-in-out transform;
    box-shadow: 0 11px 31px 10px rgba(255, 255, 255, 0.05);


    &.shown {
      display: block;
      transform: scaleY(1);
    }

    .dropdown-item {
      height: 30px;
      width: 100%;
      display: flex;

      &.active {
        color: white;
        background-color: #161616;
      }

      &:hover {
        background-color: #0E0E0E;
        color: white;
      }

      span {
        margin: auto 8px;
      }
    }
  }
}
</style>