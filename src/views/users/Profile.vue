<template>
  <div data-view="profile">
    <layout-logged-frame :has-aside="false">
      <template slot="content">
        <v-layout class="form-wrapper normal">
          <ProfileForm :on-submit="onUpdateUser" />
        </v-layout>
      </template>
    </layout-logged-frame>
  </div>
</template>

<script>
  import ProfileForm from '../../components/forms/users/Profile';

  export default {
    components: {
      ProfileForm
    },
    data() {
      return {};
    },
    methods: {
      onUpdateUser(user) {
        return this.$store.dispatch('users/updateUser', user);
      }
    },
    metaInfo() {
      return {
        title: 'Profile'
      };
    }
  };
</script>
