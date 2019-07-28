<template>
  <div
    data-component-group="thread-panels"
    data-component="category"
  >
    {{ categoryName }}
  </div>
</template>

<script>
  import { isObj } from '../../../utils';

  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },
    computed: {
      hasThread() {
        return isObj(this.thread);
      },
      hasCategory() {
        return this.hasThread && isObj(this.thread.category);
      },
      categoryName() {
        return this.hasCategory
          ? this.thread.category.name
          : '';
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="category"] {
      font-size: 14px;
      color: $colors.grey.darken-4;
    }
  }
</style>
