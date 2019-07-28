<template>
  <div data-view="register">
    <layout-auth-frame :has-aside="false">
      <template slot="content">
        <v-layout class="form-wrapper normal">
          <Register :on-submit="registerUser" />
        </v-layout>
      </template>
    </layout-auth-frame>
  </div>
</template>

<script>
  import Register from '../../components/forms/auth/Register';

  export default {
    components: {
      Register
    },
    data() {
      return {
        stepBoxPos: {
          top: 58,
          right: 0
        },
        userProfile: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        isLoading: false,
        isSubmitted: false
      };
    },
    methods: {
      registerUser(user) {
        this.isLoading = true;
        this.isSubmitted = true;
        return this.$store.dispatch('auth/register', user)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch(() => {
            this.isLoading = false;
            this.isSubmitted = false;
          });
      }
    },
    metaInfo() {
      return {
        title: 'Register'
      };
    }
  };
</script>

<style lang="stylus" scoped>
  [data-view="register"] {
    .form-wrapper {
      position: relative;
    }

    .step-counter {
      font-size: 16px;
    }
  }
</style>
