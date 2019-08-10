<template>
  <div
    data-component-group="filter-forms"
    data-component="trips"
  >
    <FiltersForm
      :has-filters="hasFilters"
      @filter="onFilter"
      @clear="onClearFilters"
    >
      <v-text-field
        v-model="origin"
        type="text"
        label="Origin"
        prepend-inner-icon="my_location"
      />

      <v-text-field
        v-model="destination"
        type="text"
        label="Destination"
        prepend-inner-icon="location_searching"
      />
    </FiltersForm>
  </div>
</template>

<script>
  import stringEscape from 'js-string-escape';
  import FiltersForm from './Filters';

  // TODO: Translate component

  export default {
    components: {
      FiltersForm
    },
    data() {
      return {
        origin: '',
        destination: ''
      };
    },
    computed: {
      hasFilters() {
        const { origin, destination } = this;
        return origin !== ''
          || destination !== '';
      }
    },
    methods: {
      onFilter() {
        const { origin, destination } = this;
        const formattedOrigin = stringEscape(origin);
        const formattedDestination = stringEscape(destination);

        this.$emit('filter', {
          origin: formattedOrigin,
          destination: formattedDestination
        });
      },
      onClearFilters() {
        this.origin = '';
        this.destination = '';

        this.$emit('clearFilters');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  [data-component-group="filter-forms"] {
    &[data-component="trips"] {
      h1 {
        display: flex;
        align-items: center;
        margin: 0 0 32px 0;
        min-height: 48px;
      }
    }
  }
</style>
