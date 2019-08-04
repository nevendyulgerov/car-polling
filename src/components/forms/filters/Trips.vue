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

      <base-date-picker
        placeholder="Departure time"
        :date="departureTime"
        :is-required="true"
        :is-boxed="false"
        :config="dateConfig"
        :on-change="onChangeDepartureTime"
      />

      <v-text-field
        v-model="availablePlaces"
        type="number"
        step="1"
        min="0"
        max="100"
        label="Available places"
        prepend-inner-icon="airline_seat_recline_normal"
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
        destination: '',
        departureTime: '',
        availablePlaces: '',
        dateConfig: {
          format: 'm/d/Y H:i',
          altFormat: 'm/d/Y H:i',
          time_24hr: true,
          enableTime: true,
        }
      };
    },
    computed: {
      hasFilters() {
        const { origin, destination, departureTime, availablePlaces } = this;
        return origin !== ''
          || destination !== ''
          || departureTime !== ''
          || availablePlaces !== '';
      }
    },
    methods: {
      onFilter() {
        const { origin, destination, departureTime, availablePlaces } = this;
        const formattedOrigin = stringEscape(origin);
        const formattedDestination = stringEscape(destination);

        this.$emit('filter', {
          origin: formattedOrigin,
          destination: formattedDestination,
          departureTime,
          availablePlaces
        });
      },
      onClearFilters() {
        this.origin = '';
        this.destination = '';
        this.departureTime = '';
        this.availablePlaces = '';

        this.$emit('clearFilters');
      },
      onChangeDepartureTime(departureTime) {
        this.departureTime = departureTime;
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
