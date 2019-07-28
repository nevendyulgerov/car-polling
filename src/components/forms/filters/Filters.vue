<template>
  <div
    data-component-group="filter-forms"
    data-component="filters"
  >
    <div class="component-header">
      <h1>
        {{ title }}
      </h1>
    </div>
    <div class="component-body">
      <form @submit.prevent="onSubmit">
        <slot />
      </form>
    </div>
    <div :class="getActionsClass()">
      <v-btn
        v-if="hasFilters"
        color="primary"
        @click="onClearFilters"
      >
        <v-icon>
          close
        </v-icon>
        {{ clearTriggerLabel }}
      </v-btn>
      <v-btn
        color="secondary"
        @click="onFilter"
      >
        <v-icon>
          filter_list
        </v-icon>
        {{ submitTriggerLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Filters'
      },
      submitTriggerLabel: {
        type: String,
        default: 'Filter'
      },
      clearTriggerLabel: {
        type: String,
        default: 'Clear'
      },
      hasFilters: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getActionsClass() {
        return {
          'component-actions': true,
          'has-filters': this.hasFilters
        };
      },
      onFilter() {
        this.$emit('filter');
      },
      onClearFilters() {
        this.$emit('clear');
      }
    }
  };
</script>

<style lang="stylus">
  [data-component-group="filter-forms"] {
    &[data-component="filters"] {
      padding: 0 32px 40px 0;

      > .component-header {
        h1 {
          display: flex;
          align-items: center;
          margin: 0 0 20px 0;
        }
      }

      > .component-actions {
        padding: 10px 0 0 0;

        &.has-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .v-btn {
          padding: 0 12px 0 8px;
          margin: 0;

          .v-icon {
            margin: 0 8px 0 0;
          }

          border-radius: 4px;
        }
      }

      .v-text-field,
      .date-time-field {
        padding-top: 6px;
      }
    }
  }
</style>
