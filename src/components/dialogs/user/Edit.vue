<template>
  <div
    data-component-group="user-dialog"
    data-component="edit"
  >
    <base-edit-dialog
      icon="account_circle"
      :to="`/users/${user.id}`"
      :title="`${userName} ${isBlockedUser ? '(Blocked)' : ''}`"
      :is-error="isBlockedUser"
      content-class="edit-user-dialog"
      :is-on="isOn"
      :is-fullscreen="true"
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
  import EditUserForm from '../../forms/user/Edit';
  import { isStr } from '../../../utils';

  const { location } = window;

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
    data() {
      return {
        location
      };
    },
    computed: {
      userName() {
        const { firstname = '', lastname } = this.user;

        return firstname !== '' ? `${firstname} ${lastname}` : 'User profile';
      },
      isBlockedUser() {
        const { status = {} } = this.user;
        return isStr(status.name) && status.name.toLowerCase() === 'blocked';
      }
    },
    methods: {
      getClass() {
        return {
          'is-blocked': this.isBlockedUser
        };
      }
    }
  };
</script>
