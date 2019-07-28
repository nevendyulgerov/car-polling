<template>
  <div
    data-component-group="dropdown"
    data-component="scroll-to"
  >
    <v-menu
      v-model="isOn"
      bottom
      offset-y
      :max-height="maxHeight"
      transition="slide-y-transition"
      nudge-bottom="10"
      content-class="thread-actions"
      :close-on-click="true"
      :close-on-content-click="false"
    >
      <v-btn
        slot="activator"
        class="trigger toggle-menu"
        color="primary"
        small
        dark
        round
        :class="getTriggerClass()"
        @click="toggleMenu()"
      >
        {{ triggerLabel }}
        <v-icon>
          keyboard_arrow_down
        </v-icon>
      </v-btn>

      <v-list class="default-list">
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          :value="item"
          @click="selectItem(item)"
        >
          <v-list-tile-title>
            <v-icon>
              {{ item.icon }}
            </v-icon>
            {{ item.label }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      triggerLabel: {
        type: String,
        default: 'Go to section'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        maxHeight: 500,
        isOn: false,
        isLoading: false
      };
    },
    methods: {
      toggleMenu() {
        this.isOn = !this.isOn;
      },
      getTriggerClass() {
        return {
          active: this.isOn,
        };
      },
      scrollTo(item) {
        const target = document.querySelector(`.${item.target}`);

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      },
      selectItem(item) {
        this.toggleMenu();
        this.scrollTo(item);
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  .thread-actions {
    .v-list__tile__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .v-icon {
        margin: 0 6px 0 0;
      }
    }
  }

  [data-component-group="dropdown"] {
    &[data-component="scroll-to"] {
      margin: 0 0 0 16px;

      .v-menu {
        width: 100%;
      }

      .v-input {
        padding: 0;
        margin: 0;
      }

      .trigger.toggle-menu {
        width: 100%;
        margin: 0;
        border-radius: 30px;

        &:not(.active) {
          .v-icon {
            &:last-child {
              transform: rotate(0deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }

        &.active {
          background-color: $colors.primary;

          .v-icon {
            &:last-child {
              transform: rotate(180deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }
      }

      .v-btn {
        margin: 0;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 4px;

        .v-icon {
          margin: 0 0 0 6px;
        }
      }
    }
  }
</style>
