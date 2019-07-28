<template>
  <div
    data-component-group="thread-panels"
    data-component="business"
  >
    <div :class="getBusinessCellClass()">
      <v-icon>
        {{ businessIcon }}
      </v-icon>
      {{ businessName }}
    </div>
    <div class="user-name">
      <v-icon class="user-icon">
        account_circle
      </v-icon>
      {{ userName }}
    </div>
  </div>
</template>

<script>
  import { isNum } from '../../../utils';

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
      businessName() {
        return this.hasThread ? this.thread.business.name : '';
      },
      userName() {
        return this.hasThread
          ? `${this.thread.user.firstname} ${this.thread.user.lastname}`
          : '';
      },
      businessIcon() {
        return this.isKeyAccount ? 'star' : 'home';
      },
      isKeyAccount() {
        return this.thread.is_key_account;
      },
      hasThread() {
        return isNum(this.thread.id);
      }
    },
    methods: {
      getBusinessCellClass() {
        return {
          'business-name': true,
          'is-key-account': this.isKeyAccount
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="business"] {
      .v-icon {
        font-size: 22px;
        margin: 0 6px 0 0;
        color: $colors.grey.darken-4;
      }

      .is-key-account {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: $colors.primary;

        .v-icon {
          color: $colors.primary;
        }
      }

      .user-name,
      .business-name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        color: $colors.grey.darken-4;
      }

      .user-name {
        padding: 4px 0 0 0;
      }
    }
  }
</style>
