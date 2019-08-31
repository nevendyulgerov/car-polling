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
          @toggle="toggleTripDetails"
        />
      </template>
    </TripForm>
  </div>
</template>

<script>
  import TripForm from './AddNew';
  import { isObj } from '../../../utils';

  export default {
    components: {
      TripForm
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
        canEditTrip: false
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
      toggleTripDetails() {
        this.canEditTrip = !this.canEditTrip;
      }
    }
  };
</script>
