<template>
  <div
    data-component-group="filter-forms"
    data-component="users"
  >
    <FiltersForm
      :has-filters="hasFilters"
      @filter="onFilter"
      @clear="onClearFilters"
    >
      <v-text-field
        v-model="search"
        type="text"
        label="Search"
        prepend-inner-icon="search"
      />
    </FiltersForm>
  </div>
</template>

<script>
  import stringEscape from 'js-string-escape';
  import FiltersForm from './Filters';

  export default {
    components: {
      FiltersForm
    },
    data() {
      return {
        search: ''
      };
    },
    computed: {
      hasFilters() {
        const { search } = this;
        return search !== '';
      }
    },
    methods: {
      onFilter() {
        const { search } = this;
        const formattedSearch = stringEscape(search);

        this.$emit('filter', {
          search: formattedSearch
        });
      },
      onClearFilters() {
        this.search = '';

        this.$emit('clearFilters');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  [data-component-group="filter-forms"] {
    &[data-component="users"] {
      h1 {
        display: flex;
        align-items: center;
        margin: 0 0 32px 0;
        min-height: 48px;
      }
    }
  }
</style>
