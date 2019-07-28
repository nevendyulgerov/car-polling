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
        <AddNewBeerForm
          :is-loading="isLoading"
          :on-cancel="onCancel"
          :on-submit="onConfirm"
        />
      </template>
    </base-add-dialog>
  </div>
</template>

<script>
  import AddNewBeerForm from '../../forms/beers/AddNew';

  export default {
    components: {
      AddNewBeerForm
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
