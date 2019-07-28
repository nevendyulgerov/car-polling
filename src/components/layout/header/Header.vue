<template>
  <div data-component="header">
    <router-link
      to="/"
      class="trigger go-to-home"
    >
      <Logo :position="logoPos" />
    </router-link>
    <slot />
  </div>
</template>

<script>
  import Logo from '../../Logo.vue';

  export default {
    components: {
      Logo,
    },
    props: {
      logoPos: {
        type: String,
        default: 'left center'
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component="header"] {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    min-height: 122px;
    padding: 0 32px;
    overflow: hidden;
    background-color: $colors.secondary;

    @media (max-width: $grid-breakpoints.md) {
      padding: 0;

      [data-component="logo"] {
        margin-left: 16px;
      }
    }

    [data-component="logo"] {
      padding: 16px 0 22px 0;
    }

    .trigger.go-to-home {
      margin: 0 auto;
      text-decoration: none;
    }
  }
</style>
