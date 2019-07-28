<template>
  <div
    data-component-group="business-panels"
    data-component="status"
    :class="getStatusClass()"
  >
    {{ business.status.name }}
  </div>
</template>

<script>
  export default {
    props: {
      business: {
        type: Object,
        required: true
      }
    },
    computed: {
      isBlocked() {
        return this.business.status.name.toLowerCase() === 'blocked';
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

  [data-component-group="business-panels"] {
    &[data-component="status"] {
      &.blocked {
        color: $colors.error;
      }
    }
  }
</style>
