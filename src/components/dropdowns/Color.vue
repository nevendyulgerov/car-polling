<template>
  <div
    data-component-group="dropdown"
    data-component="color"
  >
    <v-menu
      v-model="isOn"
      bottom
      offset-y
      :disabled="disabled"
      :max-height="maxHeight"
      transition="slide-y-transition"
      content-class="color-dropdown"
      nudge-bottom="10"
      :close-on-content-click="false"
    >
      <v-btn
        slot="activator"
        class="elevation-0 trigger toggle-menu"
        dark
        :class="getTriggerClass()"
        @click="toggleMenu()"
      >
        <div
          v-if="selectedItem"
          class="color-box"
        >
          <label-color
            :color="selectedItem[itemValue].toLowerCase()"
            :label="selectedItem[itemValue]"
          />
        </div>
        <v-icon>
          keyboard_arrow_down
        </v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item[itemKey]"
          :value="item"
          :class="getColorItemClass(item)"
        >
          <button
            class="trigger select-color"
            flat
            @click="onChange(item)"
          >
            <v-icon :class="`color-circle color-${item[itemValue].toLowerCase()}`">
              fiber_manual_record
            </v-icon>
            <span class="color-label">
              {{ item[itemValue] }}
            </span>
          </button>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      itemKey: {
        type: String,
        default: 'code'
      },
      itemValue: {
        type: String,
        default: 'name'
      },
      maxHeight: {
        type: Number,
        default: 360
      },
      minSelected: {
        type: Number,
        default: -1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onChangeItem: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        colors: [],
        isOn: false
      };
    },
    computed: {
      selectedItem() {
        return this.items.find(item => item.isSelected);
      }
    },
    methods: {
      toggleMenu() {
        this.isOn = !this.isOn;
      },
      getTriggerClass() {
        return {
          active: this.isOn,
          disabled: this.disabled
        };
      },
      getColorItemClass(item) {
        return {
          'color-item': true,
          selected: item.isSelected
        };
      },
      onChange(item) {
        this.onChangeItem(item);
        this.isOn = false;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="dropdown"] {
    &[data-component="color"] {
      .v-menu {
        width: 100%;
        display: block;
      }

      .trigger.toggle-menu {
        width: 100%;
        min-height: 49px;
        margin: 0;
        border-bottom: 1px solid $colors.grey.base;
        color: $colors.shades.black;
        background-color: transparent;
        border-radius: 0;

        .v-btn__content {
          justify-content: flex-start !important;
        }

        &:before {
          background-color: $colors.shades.white;
        }

        .v-icon {
          &:first-child {
            margin: 0 6px 0 0;
          }
          &:last-child {
            position: absolute;
            right: 0;
            top: -12px;
            margin: 0 0 0 10px;
          }
        }

        &:not(.active) {
          .v-icon {
            &:last-child {
              transform: rotate(0deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }

        &.active {
          .v-icon {
            &:last-child {
              transform: rotate(180deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }

        &.disabled {
          pointer-events: none;
          cursor: default;
        }

        .color-box {
          position: absolute;
          left: 0;
          top: -14px;
        }
      }
    }
  }

  .color-dropdown {
    .color-item {
      border-bottom: 1px solid $colors.grey.lighten-2;

      &.selected {
        background-color: $colors.grey.lighten-3;
      }

      &:last-child {
        border: none;
      }
    }

    .trigger.select-color {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0;
      padding: 0;
      outline: none;

      .color-label {
        color: $colors.shades.black;
      }
    }
  }
</style>
