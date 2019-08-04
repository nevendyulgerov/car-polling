<template>
  <div
    data-component-group="trips-form"
    data-component="add-new"
    class="elevation-2"
  >
    <slot name="beforeForm" />

    <form @:submit.prevent="onSubmit">
      <v-text-field
        v-model="origin"
        :readonly="isDisabled"
        label="Origin"
        type="text"
        :autofocus="true"
        prepend-inner-icon="my_location"
        :error-messages="originErrors"
        @blur="$v.origin.$touch()"
      />

      <v-text-field
        v-model="destination"
        :readonly="isDisabled"
        label="Destination"
        type="text"
        :autofocus="true"
        prepend-inner-icon="location_searching"
        :error-messages="destinationErrors"
        @blur="$v.destination.$touch()"
      />

      <base-date-picker
        placeholder="Departure time"
        :date="departureTime"
        :readonly="isDisabled"
        :default-date="defaultDepartureTime"
        :is-required="true"
        :is-boxed="false"
        :config="dateConfig"
        :is-disabled="isDisabled"
        :on-blur="$v.departureTime.$touch"
        :error-messages="departureTimeErrors"
        :on-change="onChangeDepartureTime"
      />

      <v-text-field
        v-model="carModel"
        :readonly="isDisabled"
        label="Car model"
        type="text"
        :autofocus="true"
        :error-messages="carModelErrors"
        @blur="$v.carModel.$touch()"
      />

      <v-text-field
        v-model="availablePlaces"
        :readonly="isDisabled"
        type="number"
        step="1"
        min="0"
        max="10"
        label="Available places"
        prepend-inner-icon="airline_seat_recline_normal"
        :error-messages="availablePlacesErrors"
        @blur="$v.availablePlaces.$touch()"
      />

      <v-textarea
        v-model="message"
        :readonly="isDisabled"
        label="Message"
      />

      <v-checkbox
        v-model="smoking"
        label="Smoking allowed"
        primary
        hide-details
        :readonly="isDisabled"
      />

      <v-checkbox
        v-model="pets"
        label="Pets allowed"
        primary
        hide-details
        :readonly="isDisabled"
      />

      <v-checkbox
        v-model="luggage"
        label="Luggage allowed"
        primary
        hide-details
        :readonly="isDisabled"
      />

      <div
        v-if="!isDisabled"
        class="form-actions"
      >
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
  import dateFormat from '../../../config/dateFormat';
  import { isObj } from '../../../utils';

  export default {
    mixins: [validationMixin],
    validations() {
      return {
        carModel: {
          required
        },
        departureTime: {
          required
        },
        availablePlaces: {
          required
        },
        origin: {
          required
        },
        destination: {
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
        origin: '',
        destination: '',
        defaultDepartureTime: this.$moment().startOf('day').format(dateFormat),
        availablePlaces: '',
        smoking: false,
        pets: false,
        luggage: false,
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
      },
      availablePlacesErrors() {
        const errors = [];
        if (!this.$v.availablePlaces.$dirty) {
          return errors;
        }
        if (!this.$v.availablePlaces.required) {
          errors.push('Available places is required');
        }
        return errors;
      },
      originErrors() {
        const errors = [];
        if (!this.$v.origin.$dirty) {
          return errors;
        }
        if (!this.$v.origin.required) {
          errors.push('Origin is required');
        }
        return errors;
      },
      destinationErrors() {
        const errors = [];
        if (!this.$v.destination.$dirty) {
          return errors;
        }
        if (!this.$v.destination.required) {
          errors.push('Destination is required');
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
        this.origin = '';
        this.destination = '';
        this.availablePlaces = '';
        this.smoking = false;
        this.pets = false;
        this.luggage = false;
        this.isSubmitted = false;
      },
      addTrip() {
        const { carModel, message, departureTime, availablePlaces, origin, destination, smoking, pets, luggage } = this;

        const trip = {
          carModel,
          message,
          departureTime: this.$moment(departureTime).format('YYYY-MM-DD[T]HH:mm:ss:sss[Z]'),
          availablePlaces,
          origin,
          destination,
          smoking,
          pets,
          luggage
        };

        return this.onSubmit(trip)
          .then(() => this.clear());
      },
      canSubmitRequest() {
        const { carModel, departureTime, availablePlaces, origin, destination } = this;

        return carModel !== ''
          && departureTime !== ''
          && availablePlaces !== ''
          && origin
          && destination;
      },
      onChangeDepartureTime(departureTime) {
        this.departureTime = departureTime;
      },
      extractTripDate(trip) {
        const { carModel, message, departureTime, availablePlaces, origin, destination, smoking, pets, luggage } = trip;

        this.carModel = carModel;
        this.message = message;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = this.$moment(departureTime).format(dateFormat);
        this.availablePlaces = availablePlaces;
        this.smoking = smoking;
        this.pets = pets;
        this.luggage = luggage;
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
