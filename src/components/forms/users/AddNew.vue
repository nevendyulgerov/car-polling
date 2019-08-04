<template>
  <div
    data-component-group="users-form"
    data-component="add-new"
    class="elevation-2"
  >
    <slot name="beforeForm" />

    <form @:submit.prevent="onSubmit">
      <v-text-field
        v-model="firstName"
        :readonly="isDisabled"
        label="First name"
        type="text"
        :autofocus="true"
        :error-messages="firstNameErrors"
        @blur="$v.firstName.$touch()"
      />
      <v-text-field
        v-model="lastName"
        :readonly="isDisabled"
        label="Last name"
        type="text"
        :autofocus="true"
        :error-messages="lastNameErrors"
        @blur="$v.lastName.$touch()"
      />

      <div class="form-actions">
        <v-btn
          v-if="onCancel"
          depressed
          @click="cancel"
        >
          {{ 'Cancel' }}
        </v-btn>
        <v-btn
          v-if="onSubmit"
          color="primary"
          class="trigger elevation-4"
          :loading="isLoading"
          @click="submit"
        >
          <v-icon>
            local_drink
          </v-icon>
          {{ confirmTriggerLabel }}
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { isObj } from '../../../utils';

  export default {
    mixins: [validationMixin],
    validations() {
      return {
        firstName: {
          required
        },
        lastName: {
          required
        }
      };
    },
    props: {
      user: {
        type: Object,
        default: undefined
      },
      confirmTriggerLabel: {
        type: String,
        default: 'Add user'
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      isDisabled: {
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
        firstName: '',
        lastName: '',
        isSubmitted: false
      };
    },
    computed: {
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
      }
    },
    watch: {
      user(nextVal) {
        this.clear();

        if (isObj(nextVal)) {
          this.extractUserData(nextVal);
        }
      }
    },
    methods: {
      cancel() {
        this.clear();
        this.onCancel();
      },
      submit() {
        this.$v.$touch();

        if (!this.canSubmitRequest() || this.$v.$error || this.$v.pending) {
          return false;
        }

        this.addUser();
      },
      clear() {
        this.$v.$reset();
        this.firstName = '';
        this.lastName = '';
        this.isSubmitted = false;
      },
      addUser() {
        const { firstName } = this;

        const user = {
          firstName
        };

        return this.onSubmit(user)
          .then(() => this.clear());
      },
      canSubmitRequest() {
        const { firstName, lastName } = this;

        return firstName !== ''
          && lastName !== '';
      },
      extractUserData(user) {
        const { firstName, lastName } = user;

        this.firstName = firstName;
        this.lastName = lastName;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="users-form"] {
    &[data-component="add-new"] {
      padding: 16px;
      border-radius: 2px;
      background-color: $colors.shades.white;

      .form-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .v-btn {
          border-radius: 4px;

          &.trigger {
            .v-icon {
              margin: 0 6px 0 0;
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
