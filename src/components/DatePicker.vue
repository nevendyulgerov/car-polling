<template>
  <div data-component="date-picker">
    <v-text-field
      v-model="date"
      type="text"
      :label="placeholder"
      class="date-time-field"
      prepend-inner-icon="date_range"
      :background-color="backgroundColor"
      :readonly="true"
      :box="isBoxed"
      :hint="hint"
      :persistent-hint="isPersistentHint"
      :error-messages="errorMessages"
      @input="onInput"
      @blur="onBlur"
      @focus="toggleDatePicker"
    />
    <v-btn
      v-if="hasDate"
      class="trigger clear-date"
      flat
      depressed
      @click="clearDate"
    >
      <v-icon>
        close
      </v-icon>
    </v-btn>
    <flat-pickr
      v-if="!isDisabled"
      ref="datePicker"
      v-model="dateText"
      :config="dateConfig"
    />
  </div>
</template>

<script>
  import colors from 'vuetify/es5/util/colors';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    components: {
      flatPickr
    },
    props: {
      date: {
        type: String,
        required: true
      },
      defaultDate: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      hint: {
        type: String,
        default: ''
      },
      isPersistentHint: {
        type: Boolean,
        default: false
      },
      isBoxed: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default() {
          return {};
        }
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      onChange: {
        type: Function,
        default: () => {}
      },
      onInput: {
        type: Function,
        default: () => {}
      },
      onBlur: {
        type: Function,
        default: () => {}
      },
      errorMessages: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        dateText: '',
        dateConfig: {},
        isOn: false,
        colors
      };
    },
    computed: {
      backgroundColor() {
        return this.isBoxed ? colors.grey.lighten3 : 'transparent';
      },
      hasDate() {
        return this.date !== '';
      }
    },
    watch: {
      dateText(nextDateText) {
        const formattedNextDate = nextDateText.replace('to', '-');

        this.onChange(formattedNextDate);
      }
    },
    created() {
      this.dateConfig = {
        ...this.config,
        defaultDate: this.defaultDate,
        onOpen: () => {
          this.isOn = true;
        },
        onClose: () => {
          this.isOn = false;
        }
      };
    },
    methods: {
      toggleDatePicker() {
        if (this.isDisabled) {
          return false;
        }

        this.isOn = !this.isOn;

        if (this.isOn) {
          this.openDatePicker();
        } else {
          this.closeDatePicker();
        }
      },
      getDatePickerInstance() {
        return this.$refs.datePicker.$vnode.elm._flatpickr;
      },
      openDatePicker() {
        const datePicker = this.getDatePickerInstance();
        datePicker.open();
      },
      closeDatePicker() {
        const datePicker = this.getDatePickerInstance();
        datePicker.close();
      },
      clearDate() {
        const datePicker = this.getDatePickerInstance();

        datePicker.clear();
        this.onChange('');
      }
    }
  };
</script>

<style lang="stylus">
  @import "../assets/stylus/theme.styl";

  [data-component="date-picker"] {
    position: relative;

    &.disabled {
      .date-time-field {
        cursor: default;
      }

      .flatpickr-input {
        cursor: default;
      }
    }

    .flatpickr-input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .v-text-field__details {
      padding: 0 !important;
    }

    .trigger.clear-date {
      position: absolute;
      top: 8px;
      right: 0;
      padding: 0;
      margin: 0;
      min-width: auto;
      width: 23px;
      height: 23px;
      min-height: auto;
      color: $colors.grey.base;

      &:before {
        background-color: transparent;
      }
    }
  }
</style>
