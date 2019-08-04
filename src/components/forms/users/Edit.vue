<template>
  <div
    data-component-group="trips-form"
    data-component="edit"
  >
    <UserForm
      :user="user"
      confirm-trigger-label="Update user"
      :is-disabled="!canEditUser"
      :is-loading="isLoading"
      :on-cancel="onCancel"
      :on-submit="onSubmit"
    >
      <template slot="beforeForm">
        <layout-section-header
          title="User details"
          :has-trigger="false"
        />
      </template>
    </UserForm>
  </div>
</template>

<script>
  import UserForm from './AddNew';
  import { isObj } from '../../../utils';

  export default {
    components: {
      UserForm
    },
    props: {
      user: {
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
        canEditUser: false
      };
    },
    watch: {
      user(nextVal) {
        if (isObj(nextVal)) {
          this.canEditUser = false;
        }
      }
    }
  };
</script>
