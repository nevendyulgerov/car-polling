<template>
  <div
    data-component-group="trips-form"
    data-component="edit"
  >
    <TripForm
      :trip="trip"
      confirm-trigger-label="Update trip"
      :is-disabled="!canEditTrip"
      :is-loading="isLoading"
      :on-cancel="onCancel"
      :on-submit="onSubmit"
    >
      <template slot="beforeForm">
        <layout-section-header
          title="Trip details"
          :trigger-label="canEditTrip ? 'Close' : 'Edit trip'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditTrip"
        />
      </template>
    </TripForm>

    <Passengers :trip="trip">
      <template slot="beforeForm">
        <layout-section-header
          title="Passengers"
          :trigger-label="canEditPassengers ? 'Close' : 'Edit'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditPassengers"
        />
      </template>
    </Passengers>

    <TripStatus :trip="trip">
      <template slot="beforeForm">
        <layout-section-header
          title="Trip Status"
          :trigger-label="canEditTripStatus ? 'Close' : 'Edit'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditTripStatus"
        />
      </template>
    </TripStatus>
  </div>
</template>

<script>
  import TripForm from './AddNew';
  import Passengers from './Passengers';
  import TripStatus from './TripStatus';
  import { isObj } from '../../../utils';

  export default {
    components: {
      TripForm,
      Passengers,
      TripStatus
    },
    props: {
      trip: {
        type: Object,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      onCancel: {
        type: Function,
        default: undefined
      },
      onSubmit: {
        type: Function,
        default: undefined
      },
    },
    data() {
      return {
        canEditTrip: false,
        canEditPassengers: false
      };
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      isTripDriver() {
        const { trip, loggedUser } = this;
        return isObj(trip) && isObj(trip.driver) && trip.driver.id === loggedUser.id;
      }
    },
    watch: {
      trip(nextVal) {
        if (isObj(nextVal)) {
          this.canEditTrip = false;
        }
      }
    },
    methods: {
      toggleEditTrip() {
        this.canEditTrip = !this.canEditTrip;
      },
      toggleEditPassengers() {
        this.canEditPassengers = !this.canEditPassengers;
      },
      toggleEditTripStatus() {
        this.canEditTripStatus = !this.canEditTripStatus;
      }
    }
  };
</script>

<style lang="stylus">
  [data-component-group="trips-for"] {
    &[data-component="edit"] {

      [data-component="passengers"] {
        margin-top: 24px;
      }

      [data-component="trip-status"] {
        margin-top: 24px;
      }
    }
  }
</style>
