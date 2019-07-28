<template>
  <div
    data-component-group="header-layout"
    data-component="logged"
  >
    <Header logo-pos="center center">
      <LoggedTabs />

      <div class="user-menu-box">
        <UserMenu />
      </div>
    </Header>
  </div>
</template>

<script>
  import Header from './Header';
  import LoggedTabs from '../../tabs/Logged';
  import UserMenu from '../../UserMenu';

  // TODO: Update/use CountriesMenu component

  export default {
    components: {
      Header,
      LoggedTabs,
      UserMenu
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="header-layout"] {
    &[data-component="logged"] {
      [data-component="logo"] {
        display: inline-block;
        width: 200px;
      }

      .user-menu-box {
        position: absolute;
        top: 18px;
        right: 32px;

        @media (max-width: $grid-breakpoints.md) {
          right: 16px;
        }

        @media (max-width: $grid-breakpoints.xs) {
          top: 42px;
        }
      }

      .menu-box {
        display: inline-block;
        position: relative;

        @media (max-width: $grid-breakpoints.xs) {
          position: absolute;
          right: 16px;
          top: 14px;
        }

        [data-component="countries-menu"] {
          display: inline-block;
          position: absolute;
          bottom: 54px;
          left: 194px;

          @media (max-width: $grid-breakpoints.md) {
            left: 208px;
          }

          @media (max-width: $grid-breakpoints.xs) {
            position: initial;

            .v-menu {
              position: initial !important;
            }
          }

          .v-menu {
            display: inline-block;
            position: absolute;
            top: -2px;
            left: -2px;
          }
        }
      }
    }
  }
</style>
