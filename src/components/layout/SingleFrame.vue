<template>
  <div
    data-component-group="layout"
    data-component="single-frame"
  >
    <layout-logged-frame :has-aside="false">
      <template slot="content">
        <base-breadcrumbs />
        <slot name="content" />
      </template>
    </layout-logged-frame>
  </div>
</template>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  [data-component-group="layout"] {
    &[data-component="single-frame"] {
      main {
        padding: 30px 0 0 0 !important;

        .main-content {
          > div {
            max-width: 800px;
            margin: 0 auto;

            > .component-body {
              margin: 0 auto;
            }
          }

          [data-component="breadcrumbs"] {
            max-width: $grid-breakpoints.md;
            margin: 0 auto 30px auto;
          }

          .layout {
            .flex {
              padding: 4px;
            }
          }
        }
      }
    }
  }
</style>
