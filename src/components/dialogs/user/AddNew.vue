<template>
  <div
    data-component-group="user-dialog"
    data-component="add-new"
  >
    <base-add-dialog
      icon="account_circle"
      title="Add new user"
      :is-on="isOn"
      :is-fullscreen="true"
      :on-close="onCancel"
    >
      <template slot="content">
        <AddNewUserForm
          :is-loading="isLoading"
          :on-cancel="onCancel"
          :on-submit="onConfirm"
        />
      </template>
    </base-add-dialog>
  </div>
</template>

<script>
  import AddNewUserForm from '../../forms/user/AddNew';

  export default {
    components: {
      AddNewUserForm
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
