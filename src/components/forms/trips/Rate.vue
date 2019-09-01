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
    />

    <v-btn
      color="primary"
      class="trigger elevation-4"
      @click="submit"
    >
      <v-icon>
        star_rate
      </v-icon>
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
    }
  }
</style>
