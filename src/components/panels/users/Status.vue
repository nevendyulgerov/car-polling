<template>
  <div
    data-component-group="user-panels"
    data-component="status"
    :class="getStatusClass()"
  >
    {{ user.status.name }}
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      isBlocked() {
        return this.user.status.name.toLowerCase() === 'blocked';
      }
    },
    methods: {
      getStatusClass() {
        return {
          blocked: this.isBlocked
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="user-panels"] {
    &[data-component="status"] {
      &.blocked {
        color: $colors.error;
      }
    }
  }
</style>
