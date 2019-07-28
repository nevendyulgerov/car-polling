<template>
  <div
    data-component-group="auth-form"
    data-component="login-form"
  >
    <Form title="Login">
      <v-text-field
        v-model="username"
        label="Username"
        required
        :autofocus="true"
        :error-messages="usernameErrors"
        @blur="$v.username.$touch()"
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
          flat
          class="trigger login"
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
  import { required } from 'vuelidate/lib/validators';
  import Form from '../Form';

  export default {
    components: {
      Form,
    },
    mixins: [validationMixin],
    validations: {
      username: {
        required
      },
      password: {
        required
      },
    },
    data() {
      return {
        username: '',
        password: '',
        isPasswordVisible: false,
        isSubmitted: false,
        isLoading: false
      };
    },
    computed: {
      usernameErrors() {
        const errors = [];
        if (!this.$v.username.$dirty) {
          return errors;
        }
        if (!this.$v.username.required) {
          errors.push('Username is required');
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
        this.username = '';
        this.password = '';
        this.isSubmitted = false;
      },
      login() {
        const userAuth = {
          username: this.username,
          password: this.password,
        };

        this.isSubmitted = true;
        this.isLoading = true;
        return this.$store.dispatch('auth/login', userAuth)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch(() => {
            this.isLoading = false;
            this.isSubmitted = false;
          });
      },
      canSubmitRequest() {
        return this.username !== ''
          && this.password !== ''
          && !this.isSubmitted;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="auth-form"] {
    &[data-component="login-form"] {
      width: 100%;

      .trigger.go-to-reset-pass {
        color: $colors.shades.black;
        background-color: transparent;
        margin-right: $spacing-sm;
        text-transform: none;

        &:before {
          background-color: transparent !important;
        }
      }

      .trigger.login {
        background-color: $colors.grey.darken-3;
      }
    }
  }
</style>
