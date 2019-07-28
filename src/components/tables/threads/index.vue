<template>
  <div
    data-component-group="threads-tables"
    data-component="index"
  >
    <component
      :is="componentName"
      :selected-rows="selectedRows"
      :columns="columns"
      :items="threads"
      :pages="pages"
      :pagination="pagination"
      :is-loading="isLoading"
      :has-custom-items-template="true"
      :on-select-item="onSelectItem"
      :on-check-row="onCheckRow"
      :on-check-all-rows="onCheckAllRows"
      :on-update-pagination="onUpdatePagination"
      :on-change-page="onChangePage"
      :class="getComponentClass()"
    >
      <template slot="title">
        <h1>{{ title }}</h1>
        <span class="heading-separator">
          {{ ' / ' }}
        </span>
        <h2>{{ `${totalThreads} deals` }}</h2>
        <div
          v-if="selectedRows.length > 0"
          class="select-actions"
        >
          <div class="title-box">
            <span
              class="heading-separator"
            >
              {{ ' / ' }}
            </span>
            <span
              class="selected-count"
            >
              {{ `${selectedRows.length} selected` }}
            </span>
            <slot name="afterTitle" />
          </div>
        </div>
      </template>

      <template
        slot="item-cell"
        slot-scope="scope"
      >
        <StartDatePanel
          v-if="scope.cell.column.value === 'start_date'"
          :start-date="scope.cell.item.start_date"
        />
        <BusinessPanel
          v-else-if="scope.cell.column.value === 'business'"
          :thread="scope.cell.item"
        />
        <ThreadPanel
          v-else-if="scope.cell.column.value === 'deal'"
          :thread="scope.cell.item"
          :on-toggle-comments="onToggleComments"
          :show-tags="!isBusinessContact"
        />
        <CategoryPanel
          v-else-if="scope.cell.column.value === 'category'"
          :thread="scope.cell.item"
        />
        <StatusPanel
          v-else-if="scope.cell.column.value === 'status'"
          :thread="scope.cell.item"
          :is-assignee-visible="true"
          :on-update-thread="onUpdateThread"
        />
        <SubmittedDatePanel
          v-else-if="scope.cell.column.value === 'created_at'"
          :thread="scope.cell.item"
        />
        <UpdatedAtPanel
          v-else-if="scope.cell.column.value === 'updated_at'"
          :thread="scope.cell.item"
        />
        <div v-else>
          {{ displayColumnValue(scope.cell.item, scope.cell.column.value) }}
        </div>
      </template>
    </component>
  </div>
</template>

<script>
  import ThreadPanel from '../../panels/threads/Thread';
  import BusinessPanel from '../../panels/threads/Business';
  import StatusPanel from '../../panels/threads/Status';
  import UpdatedAtPanel from '../../panels/threads/UpdatedAt';
  import CategoryPanel from '../../panels/threads/Category';
  import SubmittedDatePanel from '../../panels/threads/SubmittedDate';
  import StartDatePanel from '../../panels/threads/StartDate';
  import { extractNestedProp } from '../../../utils';

  // TODO: Translate component

  export default {
    components: {
      ThreadPanel,
      BusinessPanel,
      StatusPanel,
      UpdatedAtPanel,
      CategoryPanel,
      SubmittedDatePanel,
      StartDatePanel
    },
    props: {
      selectedRows: {
        type: Array,
        default() {
          return [];
        }
      },
      threads: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      pages: {
        type: Number,
        required: true
      },
      pagination: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      disableSelect: {
        type: Boolean,
        default: false
      },
      isLoading: {
        type: Boolean,
        required: true
      },
      onSelectItem: {
        type: Function,
        required: true
      },
      onCheckRow: {
        type: Function,
        default: () => {}
      },
      onCheckAllRows: {
        type: Function,
        default: () => {}
      },
      onUpdatePagination: {
        type: Function,
        required: true
      },
      onChangePage: {
        type: Function,
        required: true
      },
      onUpdateThread: {
        type: Function,
        default: () => {}
      },
      onToggleComments: {
        type: Function,
        default: () => {}
      }
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      totalThreads() {
        return this.pagination.totalItems || 0;
      },
      componentName() {
        return this.disableSelect
          ? 'base-table'
          : 'base-selectable-table';
      },
      isBusinessContact() {
        return this.loggedUser.role.slug === 'business_contact';
      }
    },
    methods: {
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      },
      getComponentClass() {
        return {
          'base-table': this.disableSelect,
          'base-selectable-table': !this.disableSelect
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  .base-selectable-table {
    thead {
      tr {
        th {
          &:first-child {
            width: 44px;
            margin: 0;
            padding: 0 10px 0 12px;

            .v-input--selection-controls__input {
              width: auto !important;
              margin: 0 !important;
            }
          }
        }
      }
    }
  }
</style>
