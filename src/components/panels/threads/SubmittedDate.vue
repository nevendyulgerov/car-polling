<template>
  <div
    data-component-group="thread-panels"
    data-component="submitted-date"
  >
    <span class="date">
      {{ date }}
    </span>
    <span class="hour">
      {{ hour }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },
    computed: {
      createdAtDate() {
        return this.thread.created_at;
      },
      date() {
        return this.$moment(this.createdAtDate).format('YYYY-MM-DD');
      },
      hour() {
        return this.$moment(this.createdAtDate).format('HH:mm:ss');
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="submitted-date"] {
      .date {
        display: block;
        font-size: 14px;
        color: $colors.grey.darken-4;
      }

      .hour {
        display: block;
        color: $colors.grey.darken-1;
      }
    }
  }
</style>
