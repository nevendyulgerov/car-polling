<template>
  <div
    data-component-group="threads-tables"
    data-component="managers"
  >
    <ul>
      <li
        v-for="(group, index) in groups"
        :key="index"
      >
        <ThreadsTable
          :disable-select="disableSelect"
          :title="getTableTitle(group.user)"
          :selected-rows="group.selectedThreads"
          :columns="group.columns"
          :threads="group.threads"
          :pages="group.pages"
          :pagination="group.pagination"
          :is-loading="group.isLoading"
          :has-custom-items-template="true"
          :on-select-item="onSelectItem"
          :on-check-row="(item, checked) => onUpdateRows(item, checked, group)"
          :on-check-all-rows="(checked) => onCheckAllRows(checked, group)"
          :on-update-pagination="(item) => onUpdatePagination(item, group)"
          :on-change-page="(item) => onChangePage(item, group)"
          :on-update-thread="onUpdateThread"
          :on-toggle-comments="(thread, isOn, onComplete) => onToggleThreadComments(thread, isOn, onComplete, group)"
        >
          <template slot="afterTitle">
            <Can
              I="see-mass-actions"
              a="thread"
            >
              <ThreadsActions
                v-if="totalSelectedItems.length > 0 && hasSelectedThreads(group.selectedThreads)"
                :actions="bulkActions"
                trigger-label="Modify"
                :on-change-item="onChangeAction"
              />
            </Can>
          </template>
        </ThreadsTable>
      </li>
    </ul>
  </div>
</template>

<script>
  import ThreadsTable from './index';
  import ThreadsActions from '../../dropdowns/threads/Actions';
  import { isStr, isObj, extractNestedProp } from '../../../utils';
  import { maxItemsPerPage } from '../../../api/server';
  import columns from '../../../config/threads/columns';
  import bulkActions from '../../../config/threads/actions/bulk';

  // TODO: Translate component

  export default {
    components: {
      ThreadsTable,
      ThreadsActions
    },
    props: {
      users: {
        type: Array,
        required: true
      },
      filters: {
        type: Object,
        default() {
          return {};
        }
      },
      action: {
        type: Object,
        default() {
          return {};
        }
      },
      totalSelectedItems: {
        type: Array,
        default() {
          return [];
        }
      },
      disableSelect: {
        type: Boolean,
        default: false
      },
      onSelectItem: {
        type: Function,
        required: true
      },
      onChange: {
        type: Function,
        default: () => {}
      },
      onUpdateThread: {
        type: Function,
        default: () => {}
      },
      onChangeAction: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        groups: [],
        isLoading: false,
        isEditItemModalOn: false,
        isEditingItem: false,
        columns,
        bulkActions
      };
    },
    computed: {
      country() {
        return this.$store.getters['config/country'];
      },
      activeUser() {
        return this.$store.getters['auth/user'];
      }
    },
    watch: {
      users(nextUsers) {
        this.getGroups(nextUsers);
      },
      filters() {
        this.getGroups(this.users);
      },
      action({ type, userId, threadId }) {
        if (type === 'deselect-all') {
          this.deselectAllRows();
        } else if (type === 'deselect') {
          this.deselectGroupThread(userId, threadId);
        }
      }
    },
    created() {
      this.getGroups(this.users);

      if (!this.$ability.can('see-business', 'thread')) {
        this.columns = this.columns.filter(({ value }) => value !== 'business');
      }

      if (!this.$ability.can('see-status', 'thread')) {
        this.columns = this.columns.filter(({ value }) => value !== 'status');
      }
    },
    methods: {
      getGroups(users) {
        this.createGroups(users);

        const { filters, groups } = this;
        const sequentialCalls = [];
        let timeout = 0;
        const step = 1000;

        groups.forEach(({ user, pagination }) => {
          const query = {
            ...filters,
            id: user.id,
            target_country: this.country.code,
            order: pagination.descending ? 'desc' : 'asc',
            sort: pagination.sortBy,
          };

          const promise = new Promise((resolve) => (
            setTimeout(() => this.getUserThreads(query, resolve), timeout)
          ));

          timeout = timeout += step;

          sequentialCalls.push(promise);
        });

        this.isLoading = true;
        Promise.all(sequentialCalls)
          .then(() => {
            this.isLoading = false;
            return this.onChange(this.groups);
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
      getUserThreads(query, resolve = () => {}) {
        this.groups = this.groups.map(group => ({
          ...group,
          isLoading: group.user.id === query.id
            || group.isLoading
        }));

        return this.$store.dispatch('threads/getUserThreads', query)
          .then(({ data, meta }) => {
            const { total, current_page, last_page } = meta;

            this.groups = this.groups.map(group => {
              const isMatch = group.user.id === query.id;
              const nextPagination = isMatch ? {
                ...group.pagination,
                totalItems: total,
                page: current_page,
                descending: query.order === 'desc',
                sortBy: query.sort !== ''
                  ? query.sort
                  : group.pagination.sortBy
              } : group.pagination;

              const nextThreads = data.map(item => ({
                ...item,
                isSelectedItem: false
              }));

              return {
                ...group,
                threads: isMatch ? nextThreads : group.threads,
                pagination: nextPagination,
                pages: isMatch ? last_page : group.pages,
                isLoading: isMatch ? false : group.isLoading
              };
            });

            return resolve();
          })
          .catch(() => {
            this.groups = this.groups.map(group => {
              const isMatch = group.user.id === query.id;

              return {
                ...group,
                isLoading: isMatch ? false : group.isLoading
              };
            });

            return resolve();
          });
      },
      onUpdatePagination({ page, descending, sortBy }, { user, pagination }) {
        const query = {
          ...this.filters,
          id: user.id,
          page,
          order: descending ? 'desc' : 'asc',
          sort: isStr(sortBy) ? sortBy : pagination.sortBy,
          target_country: this.country.code
        };

        this.getUserThreads(query);
      },
      onChangePage(item, { user, pagination }) {
        const query = {
          ...this.filters,
          id: user.id,
          page: pagination.page,
          target_country: this.country.code
        };

        this.getUserThreads(query);
      },
      onUpdateRows(item, checked, { user }) {
        this.groups = this.groups.map(group => {
          const isMatch = group.user.id === user.id;
          const nextThreads = isMatch
            ? group.threads.map((thread) => ({
              ...thread,
              isSelectedItem: thread.id === item.id
                ? checked
                : thread.isSelectedItem
            }))
            : group.threads;

          const nextSelectedThreads = nextThreads.filter((thread) => thread.isSelectedItem);

          return {
            ...group,
            threads: nextThreads,
            selectedThreads: nextSelectedThreads
          };
        });

        this.onChange(this.groups);
      },
      onCheckAllRows(checked, { user }) {
        this.groups = this.groups.map((group) => {
          const isMatch = group.user.id === user.id;
          const nextThreads = isMatch
            ? group.threads.map((thread) => ({
              ...thread,
              isSelectedItem: checked
            }))
            : group.threads;

          const nextSelectedThreads = nextThreads.filter(({ isSelectedItem }) => isSelectedItem);

          return {
            ...group,
            threads: nextThreads,
            selectedThreads: nextSelectedThreads
          };
        });

        this.onChange(this.groups);
      },
      deselectAllRows() {
        this.groups = this.groups.map(group => ({
          ...group,
          threads: group.threads.map((thread) => ({
            ...thread,
            isSelectedItem: false
          }))
        }));

        this.onChange(this.groups);
      },
      deselectGroupThread(userId, threadId) {
        this.groups = this.groups.map(group => ({
          ...group,
          threads: group.id === userId
            ? group.threads.map((thread) => ({
              ...thread,
              isSelectedItem: thread.id === threadId
                ? false
                : thread.isSelectedItem
            }))
            : group.threads
        }));

        this.onChange(this.groups);
      },
      createGroups(users) {
        this.groups = users.map(user => {
          const prevGroup = this.groups.find((group) => group.user.id === user.id);

          return {
            user,
            threads: isObj(prevGroup) ? prevGroup.threads : [],
            columns: _.cloneDeep(this.columns),
            selectedThreads: isObj(prevGroup) ? prevGroup.selectedThreads : [],
            pagination: {
              descending: true,
              page: 1,
              rowsPerPage: maxItemsPerPage,
              sortBy: 'start_date',
              totalItems: isObj(prevGroup) ? prevGroup.pagination.totalItems : 0,
              search: ''
            },
            pages: 0,
            isLoading: false
          };
        });
      },
      onToggleThreadComments(thread, isOn, onComplete, group) {
        if (thread.commentsRetrieved) {
          return onComplete();
        }

        const query = {
          id: thread.id,
          filter: 'all'
        };

        return this.$store.dispatch('threads/getComments', query)
          .then((comments) => {
            this.setThreadComments(thread, comments, group);
            return onComplete();
          })
          .catch(() => onComplete());
      },
      setThreadComments({ id }, comments, { user }) {
        this.groups = this.groups.map(group => {
          const isMatch = group.user.id === user.id;
          const nextThreads = isMatch
            ? group.threads.map((thread) => ({
              ...thread,
              comments: thread.id === id
                ? comments
                : thread.comments,
              commentsRetrieved: thread.id === id || !!thread.commentsRetrieved
            }))
            : group.threads;

          const nextSelectedThreads = nextThreads.filter((thread) => thread.isSelectedItem);

          return {
            ...group,
            threads: nextThreads,
            selectedThreads: nextSelectedThreads
          };
        });

        this.onChange(this.groups);
      },
      hasSelectedThreads(threads) {
        const selectedIds = this.totalSelectedItems.map(({ id }) => id);
        return threads.filter((thread) => selectedIds.indexOf(thread.id) > -1).length > 0;
      },
      getTableTitle(user) {
        const { activeUser } = this;

        return isObj(activeUser) && activeUser.id === user.id
          ? 'You'
          : `${user.firstname} ${user.lastname}`;
      },
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="threads-tables"] {
    &[data-component="managers"] {
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      .selected-count {
        font-size: 26px;
        color: $colors.primary;
        font-weight: 500;
      }
    }
  }
</style>
