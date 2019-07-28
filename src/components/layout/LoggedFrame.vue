<template>
  <div
    data-component-group="layout"
    data-component="logged-frame"
  >
    <layout-logged-header />

    <v-layout :class="getLayoutClass()">
      <main>
        <aside v-if="hasAside">
          <slot name="aside" />
        </aside>

        <section class="main-content">
          <slot name="content" />
        </section>
      </main>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      hasAside: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      getLayoutClass() {
        return {
          'view-wrapper': true,
          'has-aside': this.hasAside
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  [data-component-group="layout"] {
    &[data-component="logged-frame"] {
      .view-wrapper {
        padding: 0 32px;

        @media (max-width: $grid-breakpoints.md) {
          padding: 0 16px;
        }

        &:not(.has-aside) {
          main {
            .main-content {
              width: 100%;
            }
          }
        }

        main {
          display: flex;
          width: 100%;
          padding: 36px 0 0 0;

          @media (max-width: $grid-breakpoints.md) {
            display: block;
          }

          aside {
            width: 280px;

            @media (max-width: $grid-breakpoints.md) {
              width: 100%;
              padding: 0 0 20px 0;
            }
          }

          .main-content {
            width: calc(100% - 280px);

            @media (max-width: $grid-breakpoints.md) {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
