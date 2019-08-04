<template>
  <div
    data-component-group="beers-form"
    data-component="edit"
  >
    <BeerForm
      :beer="beer"
      confirm-trigger-label="Update beer"
      :is-disabled="true"
      :is-loading="isLoading"
      :on-cancel="onCancel"
      :on-submit="onSubmit"
    >
      <template slot="beforeForm">
        <layout-section-header
          title="Beer details"
          :has-trigger="false"
        />
      </template>
    </BeerForm>
  </div>
</template>

<script>
  import BeerForm from './AddNew';

  export default {
    components: {
      BeerForm
    },
    props: {
      beer: {
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
    }
  };
</script>
