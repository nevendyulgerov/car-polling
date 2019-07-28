<template>
  <div
    data-component-group="contract-panels"
    data-component="status"
    :class="getStatusClass()"
  >
    {{ contract.status.name }}
  </div>
</template>

<script>
  export default {
    props: {
      contract: {
        type: Object,
        required: true
      }
    },
    computed: {
      isSuspended() {
        return this.contract.status.name.toLowerCase() === 'suspended';
      }
    },
    methods: {
      getStatusClass() {
        return {
          suspended: this.isSuspended
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="contract-panels"] {
    &[data-component="status"] {
      &.suspended {
        color: $colors.error;
      }
    }
  }
</style>
