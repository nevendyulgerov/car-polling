<template>
  <div
    data-component-group="threads-form"
    data-component="deal-panel"
  >
    <div class="panel-container">
      <div class="primary-details">
        <div class="panel-box">
          <div class="panel-content">
            <BusinessPanel :thread="thread" />
          </div>
        </div>
        <div class="panel-box">
          <div class="panel-content">
            {{ thread.created_at }}
          </div>
        </div>
      </div>
      <div class="secondary-details">
        <div class="panel-box">
          <div class="panel-label">
            {{ 'Status:' }}
          </div>
          <div class="panel-content">
            <StatusPanel
              :thread="thread"
              :is-assignee-visible="true"
              :on-update-thread="onUpdateThread"
            />
          </div>
        </div>
        <div
          v-if="hasOwner"
          class="panel-box"
        >
          <div class="panel-label">
            {{ 'Owner:' }}
          </div>
          <div class="panel-content">
            <OwnerPanel :thread="thread" />
          </div>
        </div>
        <div class="component-actions">
          <ScrollToDropdown :items="scrollToItems" />

          <Can
            I="see-mass-actions"
            a="thread"
          >
            <ThreadsActions
              v-if="!isPublished"
              trigger-label="Actions"
              :actions="threadActions"
              :can-search="canSearch"
              :on-change-item="onChangeAction"
            />
          </Can>
        </div>
      </div>
    </div>

    <Can
      I="see-duplicate-deals"
      a="thread"
    >
      <Duplicates :duplicates="duplicates" />
    </Can>
  </div>
</template>

<script>
  import BusinessPanel from './Business';
  import StatusPanel from './Status';
  import OwnerPanel from './Owner';
  import Duplicates from './Duplicates';
  import ThreadsActions from '../../dropdowns/threads/Actions';
  import { isNum, isObj } from '../../../utils';
  import unacceptedActions from '../../../config/threads/actions/unaccepted';
  import acceptedActions from '../../../config/threads/actions/accepted';
  import deniedActions from '../../../config/threads/actions/denied';
  import ScrollToDropdown from '../../dropdowns/ScrollTo';

  // TODO: Translate component

  export default {
    components: {
      Duplicates,
      BusinessPanel,
      StatusPanel,
      OwnerPanel,
      ThreadsActions,
      ScrollToDropdown
    },
    props: {
      thread: {
        type: Object,
        required: true
      },
      duplicates: {
        type: Array,
        default() {
          return [];
        }
      },
      scrollToItems: {
        type: Array,
        required: true
      },
      onChangeAction: {
        type: Function,
        default: () => {}
      },
      onUpdateThread: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        unacceptedActions,
        acceptedActions,
        deniedActions,
        canSearch: true
      };
    },
    computed: {
      activeUser() {
        return this.$store.getters['auth/user'];
      },
      hasThread() {
        return isNum(this.thread.id);
      },
      totalSelectedThreads() {
        return this.hasThread ? [this.thread] : [];
      },
      isKeyAccount() {
        return this.thread.is_key_account;
      },
      hasOwner() {
        return this.hasThread && isObj(this.thread.manager);
      },
      lowerCasedName() {
        return this.hasThread ? this.thread.status.name.toLowerCase() : '';
      },
      isPublished() {
        return this.lowerCasedName === 'published';
      },
      isAccepted() {
        return this.lowerCasedName === 'accepted';
      },
      isAssigned() {
        return this.lowerCasedName === 'assigned';
      },
      isDenied() {
        return this.lowerCasedName === 'declined';
      },
      isUnassigned() {
        return this.lowerCasedName === 'unassigned';
      },
      isNotAvailable() {
        return this.lowerCasedName === 'n/a';
      },
      isActive() {
        const { isPublished, isAccepted } = this;
        return isPublished || isAccepted;
      },
      canModifyThread() {
        const { thread, activeUser, hasThread } = this;

        return hasThread
          && isObj(thread.assignee)
          && thread.assignee.id === activeUser.id;
      },
      isNeutral() {
        const { isUnassigned, isAssigned, isNotAvailable } = this;
        return isUnassigned || isAssigned || isNotAvailable;
      },
      threadActions() {
        const { isAccepted, isDenied, acceptedActions, unacceptedActions, deniedActions, canModifyThread } = this;
        let nextActions = isAccepted
          ? acceptedActions
          : isDenied
            ? deniedActions
            : unacceptedActions;

        if (!canModifyThread) {
          nextActions = nextActions.filter((action) => !action.isManage);
        }

        return nextActions;
      }
    },
    watch: {
      isDenied(nextVal) {
        this.canSearch = !nextVal;
      }
    },
    created() {
      this.canSearch = !this.isDenied;
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

  [data-component-group="threads-form"] {
    &[data-component="deal-panel"] {
      padding: 14px 34px;
      margin: 0px -32px -32px -32px;
      background-color: $colors.shades.white;

      @media (max-width: $grid-breakpoints.sm) {
        padding: 14px 24px;
      }

      .panel-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: $grid-breakpoints.sm) {
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .primary-details {
          @media (max-width: $grid-breakpoints.sm) {
            width: 100%;
          }

          [data-component="business"] {
            @media (max-width: $grid-breakpoints.sm) {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
        }

        .secondary-details {
          @media (max-width: $grid-breakpoints.sm) {
            width: 100%;
          }
        }
      }

      .panel-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 34px;

        .panel-label {
          color: $colors.grey.base;
          margin: 0 10px 0 0;
          min-width: 70px;
        }

        .panel-content {
          width: 100%;
          font-weight: bold;
        }
      }

      .secondary-details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .component-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      [data-component="business"] {
        .business-name {
          font-size: 20px;
          margin: 0 0 0 -3px;

          .v-icon {
            font-size: 28px;
          }
        }
      }

      [data-component="status"] {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;

        .assignee-box {
          margin: 0 0 0 10px;
        }
      }

      [data-component="actions"] {
        margin-bottom: 0;
        text-align: right;

        .v-menu {
          width: auto;

          .v-btn {
            .v-icon {
              margin: 0 0 0 10px;
            }
          }
        }
      }
    }
  }
</style>
