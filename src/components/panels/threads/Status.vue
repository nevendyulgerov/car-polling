<template>
  <div
    data-component-group="thread-panels"
    data-component="status"
    :class="getStatusClass()"
  >
    <div class="component-header">
      <Can
        I="see-status"
        a="thread"
      >
        <div class="status-name">
          {{ threadStatusName }}
        </div>
      </Can>

      <v-btn
        v-if="isPublished || hasPublishedUrl"
        flat
        small
        :replace="true"
        class="trigger view-url"
        @click="viewThreadUrl"
      >
        <v-icon>
          link
        </v-icon>
        {{ 'Link' }}
      </v-btn>
    </div>

    <div
      v-if="isAssigneeVisible"
      class="assignee-box"
    >
      <Can
        I="see-assignee"
        a="thread"
      >
        <div
          v-if="hasAssignee"
          class="assignee-panel"
        >
          <span class="assignee-name">
            {{ assigneeName }}
          </span>
        </div>
      </Can>

      <Can
        I="assign"
        a="thread"
      >
        <v-btn
          v-if="!hasAssignee"
          flat
          small
          class="trigger assign-user"
          @click="(event) => {
            event.preventDefault();
            event.stopPropagation();
            assignThreadToUser();
          }"
        >
          {{ 'Assign to me' }}
        </v-btn>
      </Can>
    </div>
  </div>
</template>

<script>
  import { isNum, isStr, isObj } from '../../../utils';

  // TODO: Translate component

  export default {
    props: {
      thread: {
        type: Object,
        default() {
          return {};
        }
      },
      isAssigneeVisible: {
        type: Boolean,
        default: false
      },
      onUpdateThread: {
        type: Function,
        default: () => {}
      }
    },
    computed: {
      activeUser() {
        return this.$store.getters['auth/user'];
      },
      lowerCasedName() {
        return this.hasThread ? this.thread.status.name.toLowerCase() : '';
      },
      hasAssignee() {
        return isObj(this.thread.assignee);
      },
      hasThread() {
        return isNum(this.thread.id);
      },
      assigneeName() {
        const { thread, isActiveUser, hasAssignee } = this;
        const { assignee } = thread;

        return isActiveUser
          ? 'You'
          : hasAssignee
            ? `${assignee.firstname} ${assignee.lastname}`
            : '';
      },
      threadStatusName() {
        return this.hasThread ? this.thread.status.name : '';
      },
      isActiveUser() {
        const { thread, activeUser, hasAssignee } = this;
        const { assignee } = thread;

        return hasAssignee && assignee.id === activeUser.id;
      },
      hasPublishedUrl() {
        return this.hasThread
          && isStr(this.thread.published_url)
          && this.thread.published_url !== '';
      },
      isPublished() {
        const { lowerCasedName } = this;
        return lowerCasedName === 'published'
          || lowerCasedName === 'live';
      },
      isAccepted() {
        return this.lowerCasedName === 'accepted';
      },
      isAssigned() {
        const { lowerCasedName } = this;
        return lowerCasedName === 'assigned'
          || lowerCasedName === 'in progress';
      },
      isUnassigned() {
        const { lowerCasedName } = this;
        return lowerCasedName === 'unassigned'
          || lowerCasedName === 'waiting to be checked';
      },
      isNotAvailable() {
        return this.lowerCasedName === 'n/a';
      },
      isDenied() {
        return this.lowerCasedName === 'denied';
      },
      isActive() {
        const { isPublished, isAccepted } = this;
        return isPublished || isAccepted;
      },
      isWarning() {
        return this.isAssigned;
      },
      isNeutral() {
        const { isUnassigned, isNotAvailable } = this;
        return isUnassigned || isNotAvailable;
      },
      isDanger() {
        return !this.isActive && !this.isNeutral && !this.isAssigned;
      }
    },
    methods: {
      getStatusClass() {
        return {
          'status-active': this.isActive,
          'status-warning': this.isWarning,
          'status-danger': this.isDanger
        };
      },
      assignThreadToUser() {
        const query = {
          id: this.thread.id,
          user: this.activeUser.id
        };

        return this.$store.dispatch('threads/assignThread', query)
          .then((res) => this.onUpdateThread(res));
      },
      viewThreadUrl(event) {
        event.preventDefault();
        event.stopPropagation();

        const { published_url } = this.thread;

        const urlWindow = window.open();
        urlWindow.opener = null;
        urlWindow.location = published_url;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="status"] {
      color: $colors.grey.darken-1;

      &.status-danger {
        color: $colors.error;
      }

      &.status-active {
        color: $colors.success;
      }

      &.status-warning {
        color: $colors.primary;
      }

      .status-name {
        font-size: 14px;
      }

      .trigger.view-url {
        font-size: 12px;
        margin: 0 0 0 -20px;
        text-transform: none;

        &:before {
          background: transparent !important;
        }

        .v-icon {
          margin: 0 4px 0 0;
        }
      }

      .assignee-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: $colors.grey.darken-2;
        margin: 0 0 0 -2px;

        .v-icon {
          font-size: 22px;
          margin: 0 4px 0 0;
        }

        .assignee-panel {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .assignee-name {
            margin: 0 0 0 2px;
          }
        }
      }

      .trigger.assign-user {
        font-size: 12px;
        text-transform: none;
        margin: -4px 0 0 -6px;

        &:before {
          background: transparent !important;
        }

        .v-icon {
          margin: 0 4px 0 0;
        }
      }
    }
  }
</style>
