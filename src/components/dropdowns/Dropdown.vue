<template>
  <div data-component="dropdown">
    <v-menu
      v-model="isOn"
      bottom
      offset-y
      :max-height="maxHeight"
      transition="slide-y-transition"
      content-class="dropdown-menu-content"
      nudge-bottom="10"
      :close-on-click="true"
      :close-on-content-click="false"
    >
      <v-btn
        slot="activator"
        class="trigger toggle-menu"
        :color="isOn ? 'primary' : 'secondary'"
        dark
        :class="getTriggerClass()"
        @click="toggleMenu()"
      >
        <v-icon class="icon-edit">
          edit
        </v-icon>
        {{ title }}
        <v-icon class="icon-toggle">
          keyboard_arrow_down
        </v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item[itemKey]"
          :value="item"
        >
          <v-checkbox
            v-model="item.isSelected"
            :label="item[itemValue]"
            :readonly="shouldDisable(item)"
            @change="onChangeItem(item)"
          />
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
        default: 'id'
      },
      itemValue: {
        type: String,
        default: 'label'
      },
      maxHeight: {
        type: Number,
        default: 360
      },
      minSelected: {
        type: Number,
        default: -1
      },
      onChangeItem: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        isOn: false
      };
    },
    computed: {
      selectedItems() {
        return this.items.filter(item => item.isSelected);
      }
    },
    methods: {
      toggleMenu() {
        this.isOn = !this.isOn;
      },
      getTriggerClass() {
        return {
          active: this.isOn,
          'elevation-4': true
        };
      },
      shouldDisable(item) {
        const { minSelected, selectedItems } = this;

        const isInvalidMinSelected = item.isSelected
          && minSelected !== -1
          && selectedItems.length === minSelected;

        return item.isRequired || isInvalidMinSelected;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  .dropdown-menu-content {
    .v-messages {
      display: none;
    }
  }

  [data-component="dropdown"] {
    .trigger.toggle-menu {
      min-width: 60px;
      height: 33px;
      border-radius: 4px;
      letter-spacing: 0.16px;
      font-weight: 500;
      line-height: 24px;
      padding-right: 6px;
      padding-left: 8px;
      margin: 0;

      .v-icon {
        &:first-child {
          margin: 0 6px 0 0;
        }
        &:last-child {
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
        background-color: $colors.primary;

        .v-icon {
          &:last-child {
            transform: rotate(180deg);
            transition: all 0.15s ease-in-out;
          }
        }
      }
    }
  }
</style>
