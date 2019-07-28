<template>
  <div
    data-component-group="list"
    data-component="removables"
  >
    <v-list two-line>
      <template
        v-for="(item, index) in items"
        class="removable-list"
      >
        <v-list-tile
          :key="index"
          avatar
          :class="getRemovableClass()"
        >
          <v-list-tile-content>
            <slot
              :item="item"
              name="item"
            />
          </v-list-tile-content>
          <v-btn
            v-if="!isDisabled"
            dark
            flat
            small
            color="secondary"
            @click="onRemove(item)"
          >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      removableClass: {
        type: String,
        default: ''
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      onRemove: {
        type: Function,
        required: true
      }
    },
    methods: {
      getRemovableClass() {
        return {
          'removable-item': true,
          [this.removableClass]: this.removableClass !== ''
        };
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="list"] {
    &[data-component="removables"] {
      .v-list {
        padding: 20px 0 0 0;
        background: transparent;
      }

      .removable-item {
        margin: 0 0 10px 0;
        border-radius: 4px;
        background-color: $colors.shades.white;

        &:last-child {
          margin: 0;
        }
      }

      .v-btn {
        width: 40px;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: -8px;
      }
    }
  }
</style>
