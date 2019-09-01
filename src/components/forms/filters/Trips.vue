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
      <v-autocomplete
        v-model="driver"
        :items="users"
        label="Driver"
        item-text="username"
        item-value="id"
        :return-object="true"
        prepend-inner-icon="account_circle"
      />

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
  import { isNum } from '../../../utils';

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
        driver: {},
        smoking: '',
        luggage: '',
        pets: '',
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
      users() {
        return this.$store.getters['users/items'];
      },
      hasFilters() {
        const { origin, destination, availablePlaces, departureDates, smoking, luggage, pets, driver } = this;
        return origin !== ''
          || destination !== ''
          || availablePlaces !== ''
          || departureDates !== ''
          || smoking !== ''
          || luggage !== ''
          || pets !== ''
          || isNum(driver.id);
      }
    },
    created() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        return this.$store.dispatch('users/getUsers');
      },
      onFilter() {
        const { origin, destination, availablePlaces, departureDates, smoking, luggage, pets, driver } = this;
        const formattedOrigin = stringEscape(origin);
        const formattedDestination = stringEscape(destination);

        this.$emit('filter', {
          origin: formattedOrigin,
          destination: formattedDestination,
          availablePlaces: availablePlaces !== '' ? Number(availablePlaces) : -1,
          departureDates,
          smoking,
          luggage,
          pets,
          driver: driver.username
        });
      },
      onClearFilters() {
        this.origin = '';
        this.destination = '';
        this.availablePlaces = '';
        this.departureDates = '';
        this.smoking = '';
        this.luggage = '';
        this.pets = '';
        this.driver = {};

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
