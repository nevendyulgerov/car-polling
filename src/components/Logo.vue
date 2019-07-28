<template>
  <div data-component="logo">
    <v-img
      :src="logo"
      class="logo"
      contain
      :height="height"
      :position="position"
    />
    <span class="app-name">
      {{ 'Carpooling' }}
    </span>
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
    text-align: center;

    .app-name {
      display: block;
      font-size: 24px;
      font-weight: bold;
      margin: 8px 0 0 0;
    }
  }
</style>
