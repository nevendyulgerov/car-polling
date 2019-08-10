<template>
  <div data-view="users">
    <EditUserDialog
      :user="selectedUser"
      :is-on="isEditUserModalOn"
      :is-loading="false"
      :on-cancel="toggleEditUserModal"
      :on-confirm="updateUser"
    />

    <layout-logged-frame :has-aside="false">
      <template slot="content">
        <base-table
          :columns="columns"
          :items="users"
          :pages="totalPages"
          :pagination="pagination"
          :has-custom-items-template="true"
          :can-edit-columns="false"
          :has-pagination="false"
          :is-loading="isLoading"
          :on-select-item="selectUser"
          :on-update-pagination="updatePagination"
        >
          <template slot="title">
            <h1>{{ 'Users' }}</h1>
            <span class="heading-separator">
              {{ ' / ' }}
            </span>
            <h2>{{ totalCount }}</h2>
          </template>

          <template
            slot="item-cell"
            slot-scope="scope"
          >
            <div v-if="scope.cell.column.value === 'avatarUri'">
              <v-img
                :src="scope.cell.item.avatarUri"
                cover
                class="user-avatar grey lighten-2 elevation-1"
              />
            </div>
            <div v-else-if="scope.cell.column.value === 'email'">
              <a
                :href="`mailto:${scope.cell.item.email}`"
                target="_blank"
              >
                {{ scope.cell.item.email }}
              </a>
            </div>
            <div v-else>
              {{ displayColumnValue(scope.cell.item, scope.cell.column.value) }}
            </div>
          </template>
        </base-table>
      </template>
    </layout-logged-frame>
  </div>
</template>

<script>
  import EditUserDialog from '../../components/dialogs/user/Edit';
  import { extractNestedProp, isStr } from '../../utils';
  import columns from '../../config/users/columns';
  import dateFormat from '../../config/dateFormat';

  export default {
    components: {
      EditUserDialog
    },
    data() {
      return {
        columns,
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 15,
          sortBy: 'firstName',
          totalItems: 0,
          search: ''
        },
        selectedUser: {},
        totalPages: 0,
        query: {},
        dateFormat,
        isLoading: false,
        isEditUserModalOn: false
      };
    },
    computed: {
      users() {
        return this.$store.getters['users/items'];
      },
      totalCount() {
        return this.users.length;
      }
    },
    methods: {
      getUsers(options = {}) {
        const {
          page = 1,
          perPage = 15,
          order = 'asc',
          sort = '',
          origin = '',
          search = ''
        } = options;

        const query = {
          page,
          perPage,
          order,
          sort,
          origin,
          search
        };

        this.isLoading = true;
        this.pagination.descending = order === 'desc';

        if (sort !== '') {
          this.pagination.sortBy = sort;
        }

        return this.$store.dispatch('users/getUsers', query)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
      selectUser(user) {
        this.selectedUser = user;
        this.toggleEditUserModal();
      },
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      },
      toggleEditUserModal() {
        this.isEditUserModalOn = !this.isEditUserModalOn;
      },
      updateUser(user) {
        console.warn('updateUser::');
        console.log(user);
      },
      onFilter(filters) {
        this.query = {
          ...this.query,
          ...filters
        };

        this.getUsers(this.query);
      },
      onClearFilters() {
        const { sortBy } = this.pagination;
        this.query = { sort: sortBy };

        this.getUsers(this.query);
      },
      updatePagination({ page, descending, sortBy }) {
        const { query, pagination } = this;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: isStr(sortBy) ? sortBy : pagination.sortBy
        };

        this.query = nextQuery;

        this.getUsers(nextQuery);
      },
    },
    metaInfo() {
      return {
        title: 'Users'
      };
    }
  };
</script>

<style lang="stylus">
  [data-view="users"] {
    .view-wrapper {
      padding: 32px 0 0 0;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      flex: inherit;
    }
  }
</style>
