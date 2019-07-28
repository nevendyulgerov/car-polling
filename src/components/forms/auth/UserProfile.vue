<template>
  <div
    data-component-group="auth-form"
    data-component="user-profile"
  >
    <Form title="Register">
      <v-text-field
        v-model="username"
        label="Username"
        required
        :autofocus="true"
        :error-messages="usernameErrors"
        @blur="$v.username.$touch()"
      />

      <v-text-field
        v-model="firstName"
        label="First name"
        required
        :error-messages="firstNameErrors"
        @blur="$v.firstName.$touch()"
      />

      <v-text-field
        v-model="lastName"
        label="Last name"
        required
        :error-messages="lastNameErrors"
        @blur="$v.lastName.$touch()"
      />

      <v-text-field
        v-model="email"
        label="Email"
        required
        :error-messages="emailErrors"
        @blur="$v.email.$touch()"
      />

      <v-text-field
        v-model="password"
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
          class="trigger register"
          @click="submit"
        >
          {{ 'Register' }}
          <v-icon>
            chevron_right
          </v-icon>
        </v-btn>
      </div>
    </Form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, minLength, email } from 'vuelidate/lib/validators';
  import Form from '../Form';
  import { config, hasLowercase, hasUppercase, hasSpecialSymbol } from '../../../validators/password';

  const pass = { ...config };

  export default {
    components: {
      Form
    },
    mixins: [validationMixin],
    validations: {
      username: {
        required
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(pass.length),
        hasLowercase,
        hasUppercase,
        hasSpecialSymbol
      }
    },
    props: {
      onSubmit: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isSubmitted: false,
        isLoading: false,
        isPasswordVisible: false
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
      firstNameErrors() {
        const errors = [];
        if (!this.$v.firstName.$dirty) {
          return errors;
        }
        if (!this.$v.firstName.required) {
          errors.push('First name is required');
        }
        return errors;
      },
      lastNameErrors() {
        const errors = [];
        if (!this.$v.lastName.$dirty) {
          return errors;
        }
        if (!this.$v.lastName.required) {
          errors.push('Last name is required');
        }
        return errors;
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
        if (!this.$v.password.minLength) {
          errors.push(('Must be {0} symbols long').replace('{0}', pass.length));
        }
        if (!this.$v.password.hasLowercase) {
          errors.push('Must have lowercase symbol');
        }
        if (!this.$v.password.hasUppercase) {
          errors.push('Must have uppercase symbol');
        }
        if (!this.$v.password.hasSpecialSymbol) {
          errors.push('Must have special symbol.');
        }
        return errors;
      }
    },
    methods: {
      submit() {
        this.$v.$touch();

        if (!this.canSubmitRequest() || this.$v.$error || this.$v.pending) {
          return false;
        }

        this.registerUser();
      },
      clear() {
        this.$v.$reset();
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.isSubmitted = false;
      },
      registerUser() {
        const { username, firstName, lastName, email, password } = this;

        const userProfile = {
          username,
          firstName,
          lastName,
          email,
          password
        };

        this.onSubmit(userProfile);
      },
      canSubmitRequest() {
        const { username, firstName, lastName, email, password } = this;

        return username !== ''
          && firstName !== ''
          && lastName !== ''
          && email !== ''
          && password !== ''
          && !this.isSubmitted;
      }
    },
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="auth-form"] {
    &[data-component="user-profile"] {
      width: 100%;

      .form-actions {
        .trigger.register {
          border-radius: 4px;

          &.active {
            color: $colors.shades.white;
            background-color: $colors.primary;
          }

          .v-icon {
            width: 10px;
            margin: 0 0 0 6px;
          }
        }
      }
    }
  }
</style>
