<template>
  <div
    data-component-group="auth-form"
    data-component="login"
  >
    <Form title="Login">
      <v-text-field
        v-model="email"
        label="Email"
        required
        type="email"
        :autofocus="true"
        :error-messages="emailErrors"
        @blur="$v.email.$touch()"
      />

      <v-text-field
        v-model="password"
        prepend-inner-icon="vpn_key"
        label="Password"
        :append-icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
        required
        :type="isPasswordVisible ? 'text' : 'password'"
        :error-messages="passErrors"
        @blur="$v.password.$touch()"
        @click:append="isPasswordVisible = !isPasswordVisible"
      />

      <div class="form-actions">
        <v-btn
          class="trigger login elevation-4"
          color="primary"
          :loading="isLoading"
          @click="submit"
        >
          <v-icon small>
            input
          </v-icon>
          {{ 'Login' }}
        </v-btn>
      </div>
    </Form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, email } from 'vuelidate/lib/validators';
  import Form from '../Form';

  export default {
    components: {
      Form,
    },
    mixins: [validationMixin],
    validations: {
      email: {
        required,
        email
      },
      password: {
        required
      },
    },
    data() {
      return {
        email: '',
        password: '',
        isPasswordVisible: false,
        isSubmitted: false,
        isLoading: false
      };
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) {
          return errors;
        }
        if (!this.$v.email.required) {
          errors.push('Email is required');
        }
        if (!this.$v.email.email) {
          errors.push('Must be valid email');
        }
        return errors;
      },
      passErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) {
          return errors;
        }
        if (!this.$v.password.required) {
          errors.push('Password is required');
        }
        return errors;
      },
    },
    methods: {
      submit() {
        this.$v.$touch();

        if (!this.canSubmitRequest() || this.$v.$error || this.$v.pending) {
          return false;
        }

        this.login();
      },
      clear() {
        this.$v.$reset();
        this.email = '';
        this.password = '';
        this.isSubmitted = false;
      },
      login() {
        const userAuth = {
          email: this.email,
          password: this.password,
        };

        this.isSubmitted = true;
        this.isLoading = true;
        return this.$store.dispatch('auth/login', userAuth)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .then(this.getLoggedUser.then(this.getUserAvatar))
          .catch(() => {
            this.isLoading = false;
            this.isSubmitted = false;
          });
      },
      getLoggedUser() {
        return this.$store.dispatch('auth/me');
      },
      getUserAvatar() {
        const query = {
          id: this.loggedUser.id
        };

        return this.$store.dispatch('auth/getUserAvatar', query);
      },
      canSubmitRequest() {
        return this.email !== ''
          && this.password !== ''
          && !this.isSubmitted;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="auth-form"] {
    &[data-component="login"] {
      width: 100%;
    }
  }
</style>
