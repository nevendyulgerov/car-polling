<template>
  <div
    data-component-group="labels"
    data-component="amount"
    :class="getClass()"
  >
    <span
      v-if="hasLabel"
      class="item-label"
    >
      {{ label + `${hasSeparator ? separator : ''}` }}
    </span>
    {{ ' ' }}
    <span
      v-if="!isHtmlValue"
      class="item-value"
    >
      {{ value }}
    </span>
    <div
      v-else
      class="item-value"
      v-html="value"
    >
    </div>
    <div
      v-if="hasExtra"
      class="extra"
    >
      <slot
        name="extra"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number],
        required: true
      },
      hasExtra: {
        type: Boolean,
        default: false
      },
      isHtmlValue: {
        type: Boolean,
        default: false
      },
      hasSeparator: {
        type: Boolean,
        default: true
      },
      separator: {
        type: String,
        default: ':'
      }
    },
    computed: {
      hasLabel() {
        return this.label !== '';
      }
    },
    methods: {
      getClass() {
        return {
          lg: this.size === 'lg'
        };
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="labels"] {
    &[data-component="amount"] {
      &.lg {
        .item-value {
          font-size: 18px;
          font-weight: 500;
        }
      }

      .item-label {
        display: inline-block;
        color: $colors.grey.base;
        font-size: 14px;
        margin: 0 6px 0 0;
      }

      .item-value {
        display: inline-block;
        font-size: 14px;
      }

      .extra {
        color: $colors.grey.base;
      }
    }
  }
</style>
