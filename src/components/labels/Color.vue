<template>
  <div
    data-component-group="labels"
    data-component="color"
  >
    <v-icon :class="`color-circle color-${color}`">
      fiber_manual_record
    </v-icon>
    <span
      v-if="label !== ''"
      class="color-label"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="labels"] {
    &[data-component="color"] {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .color-label {
        color: $colors.shades.black;
      }
    }
  }
</style>
