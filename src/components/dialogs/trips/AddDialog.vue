<template>
  <div
    data-component-group="beers-dialog"
    data-component="add-new"
  >
    <base-add-dialog
      icon="local_drink"
      title="Add new beer"
      :is-on="isOn"
      :is-fullscreen="false"
      :on-close="onCancel"
    >
      <template slot="content">
        <AddTripForm
          :is-loading="isLoading"
          :on-cancel="onCancel"
          :on-submit="onConfirm"
        />
      </template>
    </base-add-dialog>
  </div>
</template>

<script>
  import AddTripForm from '../../forms/trips/AddNew';

  export default {
    components: {
      AddTripForm
    },
    props: {
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
    }
  };
</script>
