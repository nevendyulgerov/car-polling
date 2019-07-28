<template>
  <div data-component="logo">
    <v-img
      :src="logo"
      class="logo"
      contain
      :height="height"
      :position="position"
    />
  </div>
</template>

<script>
  import logo from '../assets/images/logo.png';

  export default {
    props: {
      height: {
        type: Number,
        default: 60,
      },
      position: {
        type: String,
        default: 'center center'
      }
    },
    data() {
      return {
        logo,
      };
    }
  };
</script>

<style lang="stylus" scoped>
  [data-component="logo"] {
    width: 174px;
  }
</style>
