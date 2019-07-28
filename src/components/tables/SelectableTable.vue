<template>
  <div data-component="selectable-table">
    <div class="component-header">
      <div class="title">
        <slot name="title" />
      </div>
      <div :class="getComponentActionsClass()">
        <base-dropdown
          v-if="canEditColumns"
          title="Edit columns"
          :items="optionalColumns"
          item-key="value"
          item-value="text"
          :on-change-item="onChangeColumn"
        />
        <slot name="actions" />
      </div>
    </div>
    <v-data-table
      :value="selectedRows"
      :class="getTableClass()"
      :headers="selectedColumns"
      :items="items"
      :select-all="hasItems ? 'primary' : false"
      hide-actions
      sort-icon="arrow_drop_down"
      :total-items="pagination.totalItems"
      :pagination.sync="computedPagination"
      :loading="isLoading"
      @update:pagination="onUpdatePagination"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td class="check-all">
          <v-checkbox
            v-model="props.item.isSelectedItem"
            primary
            hide-details
            @change="(checked) => onCheckRow(props.item, checked)"
          />
        </td>
        <td
          v-for="column in selectedColumns"
          :key="getColumnValue(column.value)"
          @click="onSelectItem(props.item)"
        >
          <slot
            v-if="hasCustomItemsTemplate"
            :cell="{
              item: props.item,
              column
            }"
            name="item-cell"
          />
          <template v-else>
            <div v-if="column.value !== 'actions'">
              {{ displayColumnValue(props.item, column.value) }}
            </div>
            <div
              v-else
              @click="(event) => {
                event.stopPropagation();
                onAction(props.item, column.action);
              }"
            >
              <v-icon>
                {{ column.icon }}
              </v-icon>
            </div>
          </template>
        </td>
      </template>
      <template slot="no-results">
        <span class="no-results-box">
          {{ noDataLabel }}
        </span>
      </template>
      <template slot="no-data">
        <span class="no-results-box">
          {{ noDataLabel }}
        </span>
      </template>
    </v-data-table>

    <div
      v-if="hasItems"
      class="component-footer"
    >
      <div class="pager">
        {{ `Showing ${firstItemIndex} to ${lastItemIndex} of ${pagination.totalItems}` }}
      </div>
      <v-pagination
        v-if="pagination.totalItems > pagination.rowsPerPage"
        v-model="pagination.page"
        :length="pages"
        :total-visible="totalVisible"
        @input="onChangePage"
      />
    </div>
  </div>
</template>

<script>
  import uid from 'uid';
  import { isObj, extractNestedProp } from '../../utils';

  // TODO: Translate component

  export default {
    props: {
      selectedRows: {
        type: Array,
        default() {
          return [];
        }
      },
      columns: {
        type: Array,
        required: true
      },
      items: {
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
      noDataLabel: {
        type: String,
        default: 'No data available'
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      hasCustomItemsTemplate: {
        type: Boolean,
        default: false
      },
      canEditColumns: {
        type: Boolean,
        default: true
      },
      hasReversedActions: {
        type: Boolean,
        default: false
      },
      onChangeColumn: {
        type: Function,
        default: () => {}
      },
      onSelectItem: {
        type: Function,
        default: () => {}
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
      onAction: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        ref: uid(),
        allRowsChecked: false,
        totalVisible: 20,
        rowsPerPage: [15, 30, 50, 100]
      };
    },
    computed: {
      selectedColumns() {
        return this.columns.filter(column => column.isSelected);
      },
      firstItemIndex() {
        const { page, rowsPerPage } = this.pagination;
        return (page * rowsPerPage) - (rowsPerPage - 1);
      },
      lastItemIndex() {
        const { page, rowsPerPage, totalItems } = this.pagination;
        const index = page * rowsPerPage;
        return index < totalItems ? index : totalItems;
      },
      optionalColumns() {
        return this.columns.filter(({ isRequired }) => !isRequired);
      },
      computedPagination: {
        get() {
          return this.pagination;
        },
        set(val) {
          this.$emit('update:pagination', val);
        }
      },
      hasItems() {
        return this.items.length > 0;
      }
    },
    watch: {
      items() {
        this.removeCheckAllMonitor();
        this.addCheckAllMonitor();
      }
    },
    mounted() {
      this.addCheckAllMonitor();
    },
    beforeDestroy() {
      this.removeCheckAllMonitor();
    },
    methods: {
      addCheckAllMonitor() {
        const componentNode = this.getComponentNode();
        if (!isObj(componentNode)) {
          return false;
        }

        const checkAllCheckbox = this.getCheckAllCheckbox(componentNode);
        if (!isObj(checkAllCheckbox)) {
          return false;
        }

        checkAllCheckbox.addEventListener('click', this.checkAllRows);
      },
      removeCheckAllMonitor() {
        const componentNode = this.getComponentNode();
        if (!isObj(componentNode)) {
          return false;
        }

        const checkAllCheckbox = this.getCheckAllCheckbox(componentNode);
        if (!isObj(checkAllCheckbox)) {
          return false;
        }

        checkAllCheckbox.removeEventListener('click', this.checkAllRows);
      },
      getComponentNode() {
        return document.querySelector(`.table-${this.ref}`);
      },
      getCheckAllCheckbox(componentNode) {
        return componentNode.querySelector('.v-input--selection-controls__input');
      },
      checkAllRows() {
        const { allRowsChecked, onCheckAllRows } = this;

        this.allRowsChecked = !allRowsChecked;
        onCheckAllRows(this.allRowsChecked);
      },
      getColumnValue(value) {
        return value.indexOf('.') === -1
          ? value
          : value.split('.').join('-');
      },
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      },
      getTableClass() {
        return {
          'elevation-4': true,
          table: true,
          [`table-${this.ref}`]: true,
          selectable: true
        };
      },
      getComponentActionsClass() {
        return {
          'component-actions': true,
          reversed: this.hasReversedActions
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  [data-component="selectable-table"] {
    padding: 0 0 48px 0;

    .table,
    .v-table.v-datatable {
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }

    table.v-table thead tr {
      height: 48px;
    }

    table.v-table tbody tr {
      vertical-align: top;
    }

    table.v-table thead th:not(:nth-child(1)) {
      padding: 0 8px;
    }

    table.v-table tbody td:not(:nth-child(1)) {
      padding: 16px 8px;
    }

    > .component-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 24px 0;

      @media (max-width: $grid-breakpoints.md) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      .title {
        h1 {
          display: inline-block;

          @media (max-width: $grid-breakpoints.md) {
            padding: 0 0 10px 0;
          }
        }

        .heading-separator {
          font-size: 24px;
          margin: 0 4px;
          color: $colors.grey.lighten-1;
        }

        h2 {
          display: inline-block;
          font-size: 26px;
          font-weight: 400;
        }
      }

      > .component-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.reversed {
          flex-direction: row-reverse;
        }

        [data-component="dropdown"] {
          .trigger.toggle-menu {

            @media (max-width: $grid-breakpoints.md) {
              margin-left: 0;
            }
          }
        }

        .trigger {
          border-radius: 4px;
          margin-left: 20px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .v-datatable thead th.column.sortable {
      padding-bottom: 7px;

      .v-icon {
        position: relative;
        top: 5px;
        float: none;
        display: inline-block;
        font-size: 24px !important;
      }
    }

    .v-table {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      td.check-all {
        margin: 0;
        padding: 16px 10px 0 12px;

        .v-input--selection-controls__input {
          margin: 0 !important;
        }
      }

      tbody {
        tr {
          cursor: pointer;
          background-color: $colors.grey.lighten-5;

          &:hover {
            background-color: $colors.grey.lighten-3;
          }
        }
      }
    }

    > .component-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $colors.shades.white;
      border-top: 1px solid $colors.grey.lighten-2;
      overflow-x: auto;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.12) !important;

      @media (max-width: $grid-breakpoints.sm) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      .pager {
        width: 200px;
        padding: 10px 14px;
        font-size: 12px;
        color: $colors.grey.darken-2;
      }

      .v-pagination {
        width: calc(100% - 200px);
        justify-content: flex-end;

        button {
          box-shadow: none;
        }

        @media (max-width: $grid-breakpoints.sm) {
          width: 100%;
          justify-content: flex-start;
        }
      }
    }

    .no-results-box {
      display: block;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.16px;
      margin: 14px 0 0 0;
      font-feature-settings: 'pnum' on, 'lnum' on;
    }
  }
</style>
