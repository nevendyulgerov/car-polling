<template>
  <div
    data-component-group="trips-form"
    data-component="trip-status"
    class="elevation-4"
  >
    <slot name="beforeForm" />

    <div
      v-if="hasTrip"
      class="passengers"
    >
      <v-autocomplete
        v-model="trip.status"
        :items="tripStatuses"
        label="Trip Status"
        title="Trip Status"
        item-text="name"
        item-value="name"
        :disabled="isDisabled"
        :return-object="true"
        @change="onChangeTripStatus"
      />
    </div>
  </div>
</template>

<script>
  import { isObj, isNum } from '../../../utils';

  export default {
    props: {
      trip: {
        type: Object,
        required: true
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isLoading: false
      };
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      tripStatuses() {
        return this.$store.getters['trips/tripStatuses'];
      },
      hasTrip() {
        const { trip } = this;
        return isObj(trip) && isNum(trip.id);
      }
    },
    methods: {
      onChangeTripStatus(status) {
        const query = {
          tripId: this.trip.id,
          status: status.name,
        };

        this.isLoading = true;
        return this.$store.dispatch('trips/changeTripStatus', query)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="trips-form"] {
    &[data-component="trip-status"] {
      padding: 16px;
      border-radius: 2px;
      margin-top: 24px;
      background-color: $colors.shades.white;
    }
  }
</style>
