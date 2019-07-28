<template>
  <div data-view="login">
    <layout-auth-frame :has-aside="false">
      <template slot="content">
        <v-layout class="form-wrapper normal">
          <LoginForm />
        </v-layout>
      </template>
    </layout-auth-frame>
  </div>
</template>

<script>
  import LoginForm from '../../components/forms/auth/Login';

  export default {
    components: {
      LoginForm
    },
    metaInfo() {
      return {
        title: 'Login'
      };
    }
  };
</script>
