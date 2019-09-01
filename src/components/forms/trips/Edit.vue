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

    <Passengers
      :trip="trip"
      :is-disabled="!canEditPassengers"
    >
      <template slot="beforeForm">
        <layout-section-header
          title="Passengers"
          :trigger-label="canEditPassengers ? 'Close' : 'Edit'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditPassengers"
        />
      </template>
    </Passengers>

    <TripStatus
      :trip="trip"
      :is-disabled="!canEditTripStatus"
    >
      <template slot="beforeForm">
        <layout-section-header
          title="Trip Status"
          :trigger-label="canEditTripStatus ? 'Close' : 'Edit'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditTripStatus"
        />
      </template>
    </TripStatus>

    <AddComment :on-submit="onSubmitComment">
      <template slot="beforeForm">
        <layout-section-header
          title="Comments"
          :trigger-label="canEditComments ? 'Close' : 'Edit'"
          :has-trigger="isTripDriver"
          @toggle="toggleEditComments"
        />
      </template>
      <template slot="afterForm">
        <Comments :comments="trip.comments" />
      </template>
    </AddComment>
  </div>
</template>

<script>
  import TripForm from './AddNew';
  import Passengers from './Passengers';
  import TripStatus from './TripStatus';
  import AddComment from './AddComment';
  import Comments from '../../lists/Comments';
  import { isObj } from '../../../utils';

  export default {
    components: {
      TripForm,
      Passengers,
      TripStatus,
      AddComment,
      Comments
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
        canEditPassengers: false,
        canEditTripStatus: false,
        canEditComments: false
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
      },
      toggleEditComments() {
        this.canEditComments = !this.canEditComments;
      },
      onSubmitComment(comment) {

      }
    }
  };
</script>
