<template>
  <div
    data-component-group="layout"
    data-component="absolute-box"
    :style="getStyle()"
    :class="className"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      top: {
        type: Number,
        default: -1,
      },
      left: {
        type: Number,
        default: -1,
      },
      right: {
        type: Number,
        default: -1,
      },
      bottom: {
        type: Number,
        default: -1,
      },
      isFixed: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: ''
      }
    },
    methods: {
      getPositionProp(prop) {
        return prop !== -1 ? `${prop}px` : 'auto';
      },
      getStyle() {
        const { getPositionProp, isFixed } = this;
        const { top, left, right, bottom } = this.$props;

        return {
          top: getPositionProp(top),
          left: getPositionProp(left),
          right: getPositionProp(right),
          bottom: getPositionProp(bottom),
          position: !isFixed ? 'absolute' : 'fixed'
        };
      },
    },
  };
</script>

<style lang="stylus" scoped>
  [data-component-group="layout"] {
    &[data-component="absolute-box"] {
      position: absolute;
    }
  }
</style>
