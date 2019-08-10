<template>
  <div
    data-component-group="users-form"
    data-component="profile"
  >
    <Form title="Profile">
      <v-text-field
        v-model="email"
        label="Email"
        readonly
        required
        :error-messages="emailErrors"
        @blur="$v.email.$touch()"
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
        v-model="phone"
        label="Phone"
        required
        :error-messages="phoneErrors"
        @blur="$v.phone.$touch()"
      />

      <span class="avatar-box-label">
        {{ 'Avatar' }}
      </span>
      <div class="avatar-box">
        <v-img
          :src="avatar"
          :lazy-src="avatar"
          class="grey lighten-2 elevation-1"
          cover
        />

        <base-file-upload
          trigger-label="Choose image file"
          icon=""
          :on-filter="onFilterFile"
          :on-change="onUploadFile"
        />
      </div>

      <div class="form-actions">
        <v-btn
          class="trigger register elevation-4"
          color="primary"
          @click="submit"
        >
          <v-icon>
            account_circle
          </v-icon>
          {{ 'Update' }}
        </v-btn>
      </div>
    </Form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, email } from 'vuelidate/lib/validators';
  import Form from '../Form';
  import placeholder from '../../../assets/images/placeholder.png';

  export default {
    components: {
      Form
    },
    mixins: [validationMixin],
    validations: {
      email: {
        required,
        email
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      phone: {
        required
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
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        avatar: placeholder,
        avatarFile: '',
        placeholder,
        isSubmitted: false,
        isLoading: false,
        isPasswordVisible: false
      };
    },
    computed: {
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
      phoneErrors() {
        const errors = [];
        if (!this.$v.phone.$dirty) {
          return errors;
        }
        if (!this.$v.phone.required) {
          errors.push('Phone is required');
        }
        return errors;
      }
    },
    created() {
      this.setUserDetails();
    },
    methods: {
      setUserDetails() {
        const { firstName, lastName, email, phone, avatarUri } = this.$store.getters['auth/user'];

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.avatar = avatarUri !== '' ? avatarUri : this.placeholder;
      },
      submit() {
        this.$v.$touch();

        if (!this.canSubmitRequest() || this.$v.$error || this.$v.pending) {
          return false;
        }

        this.updateUser();
      },
      clear() {
        this.$v.$reset();
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.isSubmitted = false;
      },
      updateUser() {
        const { email, firstName, lastName, phone, avatar } = this;

        const userProfile = {
          email,
          firstName,
          lastName,
          phone,
        };

        if (avatar !== '' && avatar !== placeholder) {
          userProfile.avatar_uri = avatar;
        }

        this.onSubmit(userProfile);
      },
      canSubmitRequest() {
        const { email, firstName, lastName, phone } = this;

        return email !== ''
          && firstName !== ''
          && lastName !== ''
          && phone !== ''
          && !this.isSubmitted;
      },
      onFilterFile(file) {
        return !/\.(jpeg|jpg|png)$/i.test(file.name);
      },
      onUploadFile(file) {
        this.avatarFile = file;

        this.loadImageFile(file.file, (result) => {
          this.avatar = result;
        });
      },
      loadImageFile(file, callback) {
        const fr = new FileReader();

        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          callback(fr.result);
        });
      }
    },
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="users-form"] {
    &[data-component="profile"] {
      width: 100%;

      .avatar-box-label {
        display: block;
        margin: 0 0 4px 8px;
        color: $colors.grey.darken-1;
      }

      .avatar-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        margin: 0 0 16px 0;
        border: 1px solid $colors.grey.lighten-2;

        .v-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          flex: inherit;
        }
      }
    }
  }
</style>
