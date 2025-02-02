<template>
  <div
    data-component-group="trips-form"
    data-component="passengers"
    class="elevation-4"
  >
    <slot name="beforeForm" />

    <div
      v-if="hasTrip && trip.passengersList.length > 0"
      class="passengers"
    >
      <div>
        {{ 'Passengers' }}
      </div>

      <template v-for="passenger in trip.passengersList">
        <Passenger
          :key="passenger.id"
          :username="passenger.username"
          :status="passenger.status"
          :is-disabled="isDisabled"
          :can-rate="canRatePassenger"
          :on-change-status="(status) => onChangePassengerStatus(passenger, status)"
          :on-rate="(rating) => onRatePassenger(passenger, rating)"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import Passenger from '../../panels/users/Passenger';
  import { isObj, isNum } from '../../../utils';

  export default {
    components: {
      Passenger
    },
    props: {
      trip: {
        type: Object,
        required: true
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isLoading: false,
        isRatingPassenger: false
      };
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      hasTrip() {
        const { trip } = this;
        return isObj(trip) && isNum(trip.id);
      },
      canRatePassenger() {
        const { trip, loggedUser } = this;
        return this.hasTrip
          && trip.status === 'done'
          && trip.driver.id === loggedUser.id;
      }
    },
    methods: {
      onChangePassengerStatus(passenger, status) {
        const query = {
          tripId: this.trip.id,
          passengerId: passenger.id,
          status: status.name,
        };

        this.isLoading = true;
        return this.$store.dispatch('trips/changePassengerStatus', query)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
      onRatePassenger(passenger, rating) {
        const query = {
          tripId: this.trip.id,
          passengerId: passenger.id,
          rating,
        };

        this.isRatingPassenger = true;
        return this.$store.dispatch('trips/ratePassenger', query)
          .then((res) => {
            this.isRatingPassenger = false;
            return res;
          })
          .catch((err) => {
            this.isRatingPassenger = false;
            return err;
          });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="trips-form"] {
    &[data-component="passengers"] {
      padding: 16px;
      border-radius: 2px;
      margin-top: 24px;
      background-color: $colors.shades.white;
    }
  }
</style>
