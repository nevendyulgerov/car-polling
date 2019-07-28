<template>
  <div
    data-component-group="filter-forms"
    data-component="beers"
  >
    <FiltersForm
      :has-filters="hasFilters"
      @filter="onFilter"
      @clear="onClearFilters"
    >
      <v-text-field
        v-model="search"
        type="text"
        label="Beer name"
        prepend-inner-icon="search"
      />

      <v-text-field
        v-model="brewery"
        type="text"
        label="Brewery"
        prepend-inner-icon="local_drink"
      />

      <v-text-field
        v-model="country"
        type="text"
        label="Country"
        prepend-inner-icon="public"
      />

      <v-text-field
        v-model="abv"
        type="number"
        label="ABV"
        min="0"
        step="0.01"
        prepend-inner-icon="grade"
      />

      <v-text-field
        v-model="style"
        type="text"
        label="Style"
        prepend-inner-icon="style"
      />
    </FiltersForm>
  </div>
</template>

<script>
  import colors from 'vuetify/es5/util/colors';
  import stringEscape from 'js-string-escape';
  import FiltersForm from './Filters';

  // TODO: Translate component

  export default {
    components: {
      FiltersForm
    },
    data() {
      return {
        search: '',
        brewery: '',
        country: '',
        abv: 0,
        style: '',
        colors
      };
    },
    computed: {
      hasFilters() {
        const { search, brewery, country, abv, style } = this;
        return search !== ''
          || brewery !== ''
          || country !== ''
          || abv > 0
          || style !== '';
      }
    },
    methods: {
      onFilter() {
        const { search, brewery, country, abv, style } = this;
        const formattedSearch = stringEscape(search);

        this.$emit('filter', {
          search: formattedSearch,
          brewery,
          country,
          abv,
          style
        });
      },
      onClearFilters() {
        this.search = '';
        this.brewery = '';
        this.country = '';
        this.abv = 0;
        this.style = '';

        this.$emit('clearFilters');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  [data-component-group="filter-forms"] {
    &[data-component="beers"] {
      h1 {
        display: flex;
        align-items: center;
        margin: 0 0 32px 0;
        min-height: 48px;
      }
    }
  }
</style>
