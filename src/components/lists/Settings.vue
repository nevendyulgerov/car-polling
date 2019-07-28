<template>
  <div
    data-component-group="lists"
    data-component="settings"
  >
    <v-list
      two-line
      class="settings-list"
    >
      <template v-for="(setting, index) in rows">
        <v-list-tile
          :key="index"
          avatar
          class="setting-item"
        >
          <v-list-tile-content>
            <v-checkbox
              v-model="setting.isOn"
              :readonly="isDisabled"
              :label="setting.label"
            />
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      rows: {
        type: Array,
        required: true
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="lists"] {
    &[data-component="settings"] {
      .settings-list {
        max-height: 420px;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 0;
        border-radius: 4px;
      }

      .setting-item {
        border-bottom: 1px solid $colors.grey.lighten-2;

        &:last-child {
          border: none;
        }
      }

      .v-list__tile__content {
        padding: 0 14px;
      }
    }
  }
</style>
