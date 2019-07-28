<template>
  <div
    data-component-group="thread-panels"
    data-component="updated-at"
  >
    <div class="last-activity">
      {{ thread.last_activity }}
    </div>
    <div class="datetime-box">
      <span class="date">
        {{ date }}
      </span>
      <span class="hour">
        {{ hour }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      thread: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      date() {
        return this.$moment(this.thread.updated_at).format('YYYY-MM-DD');
      },
      hour() {
        return this.$moment(this.thread.updated_at).format('HH:mm');
      },
      isKeyAccount() {
        return this.thread.is_key_account;
      }
    },
    methods: {
      getBusinessCellClass() {
        return {
          'is-key-account': this.isKeyAccount
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="updated-at"] {
      .last-activity {
        font-size: 14px;
        color: $colors.grey.darken-4;
      }

      .is-key-account {
        color: $colors.primary;

        .v-icon {
          font-size: 16px;
          color: $colors.primary;
        }
      }

      .date,
      .hour {
        display: block;
        color: $colors.grey.darken-1;
      }
    }
  }
</style>
