<template>
  <div
    data-component-group="trips-form"
    data-component="rate"
    class="elevation-4"
  >
    <v-text-field
      v-model="rating"
      label="Rating"
      type="number"
      min="1"
      max="5"
      step="1"
      :hint="false"
    />

    <v-btn
      color="primary"
      class="trigger elevation-4"
      small
      :disabled="!hasRating"
      @click="submit"
    >
      {{ 'Rate' }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      onRate: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        rating: ''
      };
    },
    computed: {
      hasRating() {
        return this.rating !== '';
      }
    },
    methods: {
      submit() {
        return this.onRate(this.rating)
          .then((res) => {
            this.rating = '';
            return res;
          });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="trips-form"] {
    &[data-component="rate"] {
      width: 100px;
      padding: 6px;
      text-align: center;
      border-radius: 4px;
      background-color: $colors.shades.white;

      .v-input {
        margin: 0;
        padding-top: 8px;
      }

      .v-btn {
        width: 100%;
        margin: -8px 0 0 0;
      }
    }
  }
</style>
