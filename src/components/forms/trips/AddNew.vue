<template>
  <div
    data-component-group="beers-form"
    data-component="add-new"
    class="elevation-2"
  >
    <slot name="beforeForm" />

    <form @:submit.prevent="onSubmit">
      <v-text-field
        v-model="name"
        label="Name"
        type="text"
        :autofocus="true"
        :error-messages="nameErrors"
        @blur="$v.name.$touch()"
      />

      <v-autocomplete
        v-model="brewery"
        :items="breweries"
        label="Breweries"
        item-text="name"
        item-value="brewery_id"
        :return-object="true"
        required
        :readonly="isDisabled"
        :menu-props="{nudgeBottom:'10'}"
        :error-messages="breweryErrors"
        @blur="$v.brewery.$touch()"
      />

      <v-autocomplete
        v-model="country"
        :items="countries"
        label="Countries"
        item-text="name"
        item-value="country_id"
        :return-object="true"
        :menu-props="{nudgeBottom:'10'}"
        :error-messages="countryErrors"
        @blur="$v.country.$touch()"
      />

      <v-text-field
        v-model="abv"
        label="ABV"
        type="number"
        :error-messages="abvErrors"
        @blur="$v.abv.$touch()"
      />

      <v-textarea
        v-model="description"
        label="Description"
      />

      <v-autocomplete
        v-model="style"
        :items="styles"
        label="Style"
        item-text="name"
        item-value="style_id"
        :return-object="true"
        :menu-props="{nudgeBottom:'10'}"
      />

      <v-text-field
        v-model="pictureUrl"
        label="Picture URL"
        type="text"
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
        name: {
          required
        },
        brewery: {
          required
        },
        country: {
          required
        },
        abv: {
          required
        }
      };
    },
    props: {
      beer: {
        type: Object,
        default: undefined
      },
      confirmTriggerLabel: {
        type: String,
        default: 'Add beer'
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
        name: '',
        brewery: {},
        country: {},
        abv: 0,
        description: '',
        style: {},
        pictureUrl: '',
        countries: [],
        breweries: [],
        styles: [],
        isSubmitted: false
      };
    },
    computed: {
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) {
          return errors;
        }
        if (!this.$v.name.required) {
          errors.push('Name is required');
        }
        return errors;
      },
      breweryErrors() {
        const errors = [];
        if (!this.$v.brewery.$dirty) {
          return errors;
        }
        if (!this.$v.brewery.required) {
          errors.push('Brewery is required');
        }
        return errors;
      },
      countryErrors() {
        const errors = [];
        if (!this.$v.country.$dirty) {
          return errors;
        }
        if (!this.$v.country.required) {
          errors.push('Country is required');
        }
        return errors;
      },
      abvErrors() {
        const errors = [];
        if (!this.$v.abv.$dirty) {
          return errors;
        }
        if (!this.$v.abv.required) {
          errors.push('ABV is required');
        }
        return errors;
      }
    },
    watch: {
      beer(nextVal) {
        this.clear();

        if (isObj(nextVal)) {
          this.extractBeerData(nextVal);
        }
      }
    },
    created() {
      this.getCountries();
      this.getBreweries();
      this.getStyles();
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

        this.addBeer();
      },
      clear() {
        this.$v.$reset();
        this.name = '';
        this.brewery = {};
        this.country = {};
        this.abv = 0;
        this.description = '';
        this.style = {};
        this.picture = '';
        this.isSubmitted = false;
      },
      getCountries() {
        return this.$store.dispatch('trips/getCountries')
          .then((countries) => {
            this.countries = countries;
            return countries;
          });
      },
      getBreweries() {
        return this.$store.dispatch('trips/getBreweries')
          .then((breweries) => {
            this.breweries = breweries;
            return breweries;
          });
      },
      getStyles() {
        return this.$store.dispatch('trips/getStyles')
          .then((styles) => {
            this.styles = styles;
            return styles;
          });
      },
      addBeer() {
        const { name, brewery, country, abv, description, style, picture } = this;

        const beer = {
          name,
          brewery,
          country,
          abv,
          description,
          style,
          picture
        };

        return this.onSubmit(beer)
          .then(() => this.clear());
      },
      canSubmitRequest() {
        const { name, brewery, country, abv, isSubmitted } = this;

        return name !== ''
          && brewery !== ''
          && country !== ''
          && abv > 0
          && !isSubmitted;
      },
      extractBeerData(beer) {
        const { name, brewery, country, abv, description, style, picture } = beer;

        this.name = name;
        this.brewery = brewery;
        this.country = country;
        this.abv = abv;
        this.description = description;
        this.style = style;
        this.picture = picture;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="beers-form"] {
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
