<template>
  <div
    data-component-group="trips-dialog"
    data-component="edit"
  >
    <base-edit-dialog
      icon="local_drink"
      :title="title"
      content-class="edit-beer-dialog"
      :is-on="isOn"
      :on-close="onCancel"
    >
      <template slot="content">
        <EditTripForm
          :trip="trip"
          :is-loading="isLoading"
          :on-cancel="onCancel"
          :on-submit="onConfirm"
        />
      </template>
    </base-edit-dialog>
  </div>
</template>

<script>
  import EditTripForm from '../../forms/trips/Edit';
  import dateFormat from '../../../config/dateFormat';

  export default {
    components: {
      EditTripForm
    },
    props: {
      trip: {
        type: Object,
        required: true
      },
      isOn: {
        type: Boolean,
        required: true
      },
      isLoading: {
        type: Boolean,
        required: true
      },
      onCancel: {
        type: Function,
        default: () => {}
      },
      onConfirm: {
        type: Function,
        required: true
      }
    },
    computed: {
      title() {
        const { trip } = this;
        return `${trip.origin} - ${trip.destination} - ${this.$moment(trip.departureTime).format(dateFormat)}`;
      }
    }
  };
</script>
