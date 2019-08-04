<template>
  <div
    data-component-group="beers-dialog"
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
          :beer="beer"
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
  import { isStr } from '../../../utils';

  export default {
    components: {
      EditTripForm
    },
    props: {
      beer: {
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
        const { beer } = this;
        return isStr(beer.name) ? beer.name : '';
      }
    }
  };
</script>
