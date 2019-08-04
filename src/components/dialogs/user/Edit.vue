<template>
  <div
    data-component-group="user-dialog"
    data-component="edit"
  >
    <base-edit-dialog
      icon="account_circle"
      :title="title"
      content-class="edit-user-dialog"
      :is-on="isOn"
      :on-close="onCancel"
    >
      <template slot="content">
        <EditUserForm
          :user="user"
          :is-loading="isLoading"
          :on-cancel="onCancel"
          :on-submit="onConfirm"
        />
      </template>
    </base-edit-dialog>
  </div>
</template>

<script>
  import EditUserForm from '../../forms/users/Edit';

  export default {
    components: {
      EditUserForm
    },
    props: {
      user: {
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
        default: undefined
      }
    },
    computed: {
      title() {
        const { firstName = '', lastName } = this.user;

        return firstName !== '' ? `${firstName} ${lastName}` : 'User profile';
      }
    }
  };
</script>
