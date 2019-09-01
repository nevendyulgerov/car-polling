<template>
  <div
    data-component-group="dialog"
    data-component="confirm"
  >
    <base-dialog
      :content-class="contentClass"
      :is-on="isOn"
      :has-content="false"
      :max-width="maxWidth"
    >
      <template slot="title">
        {{ text }}
      </template>
      <template slot="actions">
        <v-btn
          color="secondary"
          @click="onCancel"
        >
          {{ cancelLabel }}
        </v-btn>
        <v-btn
          color="primary"
          :loading="isLoading"
          @click="onConfirm"
        >
          {{ confirmLabel }}
        </v-btn>
      </template>
    </base-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      cancelLabel: {
        type: String,
        default: 'Cancel'
      },
      confirmLabel: {
        type: String,
        default: 'OK'
      },
      contentClass: {
        type: String,
        default: 'confirm-dialog-content'
      },
      maxWidth: {
        type: Number,
        default: 420
      },
      isOn: {
        type: Boolean,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      onCancel: {
        type: Function,
        required: true
      },
      onConfirm: {
        type: Function,
        required: true
      }
    }
  };
</script>

<style lang="stylus">
  .confirm-dialog-content {
    .actions {
      padding: 10px !important;
      justify-content: flex-end;

      .v-btn {
        border-radius: 4px;
      }
    }
  }
</style>
