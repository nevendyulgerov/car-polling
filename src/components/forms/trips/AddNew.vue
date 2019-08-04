<template>
  <div
    data-component-group="trips-form"
    data-component="add-new"
    class="elevation-2"
  >
    <slot name="beforeForm" />

    <form @:submit.prevent="onSubmit">
      <v-text-field
        v-model="carModel"
        label="Car model"
        type="text"
        :autofocus="true"
        :error-messages="carModelErrors"
        @blur="$v.carModel.$touch()"
      />

      <v-textarea
        v-model="message"
        label="Message"
      />

      <base-date-picker
        placeholder="Departure time"
        :date="departureTime"
        :default-date="defaultDepartureTime"
        :is-required="true"
        :is-boxed="false"
        :config="dateConfig"
        :is-disabled="isDisabled"
        :on-blur="$v.departureTime.$touch"
        :error-messages="departureTimeErrors"
        :on-change="onChangeDepartureTime"
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

  const dateFormat = 'DD MMM YYYY HH:mm';

  export default {
    mixins: [validationMixin],
    validations() {
      return {
        carModel: {
          required
        },
        departureTime: {
          required
        }
      };
    },
    props: {
      trip: {
        type: Object,
        default: undefined
      },
      confirmTriggerLabel: {
        type: String,
        default: 'Add trip'
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
        carModel: '',
        message: '',
        departureTime: '',
        defaultDepartureTime: this.$moment().startOf('day').format(dateFormat),
        dateConfig: {
          format: 'm/d/Y H:i',
          altFormat: 'm/d/Y H:i',
          time_24hr: true,
          enableTime: true,
        },
        isSubmitted: false
      };
    },
    computed: {
      carModelErrors() {
        const errors = [];
        if (!this.$v.carModel.$dirty) {
          return errors;
        }
        if (!this.$v.carModel.required) {
          errors.push('Car model is required');
        }
        return errors;
      },
      departureTimeErrors() {
        const errors = [];
        if (!this.$v.departureTime.$dirty) {
          return errors;
        }
        if (!this.$v.departureTime.required) {
          errors.push('Departure time is required');
        }
        return errors;
      }
    },
    watch: {
      trip(nextVal) {
        this.clear();

        if (isObj(nextVal)) {
          this.extractTripDate(nextVal);
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

        this.addTrip();
      },
      clear() {
        this.$v.$reset();
        this.carModel = '';
        this.message = '';
        this.departureTime = '';
        this.isSubmitted = false;
      },
      addTrip() {
        const { carModel, message, departureTime } = this;

        const trip = {
          carModel,
          message,
          departureTime
        };

        return this.onSubmit(trip)
          .then(() => this.clear());
      },
      canSubmitRequest() {
        const { carModel, message, departureTime } = this;

        return carModel !== ''
          && message !== ''
          && departureTime !== '';
      },
      onChangeDepartureTime(departureTime) {
        this.departureTime = departureTime;
      },
      extractTripDate(trip) {
        const { carModel, message, departureTime } = trip;

        this.carModel = carModel;
        this.message = message;
        this.departureTime = departureTime;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="trips-form"] {
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
