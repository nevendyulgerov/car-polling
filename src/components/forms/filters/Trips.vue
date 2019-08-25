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

      <v-text-field
        v-model="availablePlaces"
        type="number"
        label="Available places"
      />

      <base-date-picker
        :date="departureDates"
        placeholder="Departure dates"
        :config="dateConfig"
        :on-change="onChangeDepartureDate"
      />

      <v-checkbox
        v-model="smoking"
        label="Smoking"
      />

      <v-checkbox
        v-model="luggage"
        label="Luggage"
      />

      <v-checkbox
        v-model="pets"
        label="Pets"
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
        departureDates: '',
        availablePlaces: '',
        smoking: false,
        luggage: false,
        pets: false,
        dateConfig: {
          mode: 'range',
          format: 'Y-m-d H:i',
          altFormat: 'Y-m-d H:i',
          time_24hr: true,
          enableTime: true
        },
      };
    },
    computed: {
      hasFilters() {
        const { origin, destination, availablePlaces, departureDates, smoking, luggage, pets } = this;
        return origin !== ''
          || destination !== ''
          || availablePlaces !== ''
          || departureDates !== ''
          || smoking !== ''
          || luggage !== ''
          || pets !== '';
      }
    },
    methods: {
      onFilter() {
        const { origin, destination, availablePlaces, departureDates, smoking, luggage, pets } = this;
        const formattedOrigin = stringEscape(origin);
        const formattedDestination = stringEscape(destination);

        this.$emit('filter', {
          origin: formattedOrigin,
          destination: formattedDestination,
          availablePlaces: availablePlaces !== '' ? Number(availablePlaces) : -1,
          departureDates,
          smoking,
          luggage,
          pets
        });
      },
      onClearFilters() {
        this.origin = '';
        this.destination = '';
        this.availablePlaces = '';
        this.departureDates = '';
        this.smoking = false;
        this.luggage = false;
        this.pets = false;

        this.$emit('clearFilters');
      },
      onChangeDepartureDate(dates) {
        this.departureDates = dates;
      },
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
