<template>
  <div
    v-if="hasOwner"
    data-component-group="thread-panels"
    data-component="account-owner"
  >
    <div class="contact-box">
      <v-icon>
        account_circle
      </v-icon>
      <span class="owner-name">
        {{ ownerName }}
      </span>
    </div>
  </div>
</template>

<script>
  import { isNum, isObj } from '../../../utils';

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
      hasOwner() {
        return isObj(this.thread.manager);
      },
      hasThread() {
        return isNum(this.thread.id);
      },
      ownerName() {
        const { thread, hasOwner } = this;
        const { manager } = thread;

        return hasOwner ? `${manager.firstname} ${manager.lastname}` : '';
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="account-owner"] {
      .contact-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0 0 0 -2px;

        .v-icon {
          font-size: 22px;
          margin: 0 4px 0 0;
        }

        .owner-name {
          font-weight: bold;
        }
      }
    }
  }
</style>
