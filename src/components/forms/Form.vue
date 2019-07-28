<template>
  <div data-component="form">
    <div class="component-header">
      <h1>
        {{ title }}
      </h1>
      <span
        class="heading-separator"
        v-if="secondTitle !== ''"
      >
        {{ ' / ' }}
      </span>
      <h2 v-if="secondTitle !== ''">
        {{ secondTitle }}
      </h2>
      <p
        v-if="subtitle !== ''"
        class="subtitle"
        v-html="subtitle"
      ></p>
    </div>

    <form @submit.prevent="onSubmit">
      <slot />
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      secondTitle: {
        type: String,
        default: '',
      },
      subtitle: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  [data-component="form"] {
    width: 100%;
    padding: 50px 0 100px 0;

    .component-header {
      padding: 0 0 20px 0;

      h1 {
        font-weight: 800;
        display: inline-block;
      }

      .heading-separator {
        font-size: 24px;
        margin: 0 4px;
        color: $colors.grey.lighten-1;
      }

      h2 {
        display: inline-block;
        font-size: 26px;
        font-weight: 400;
      }

      .subtitle {
        white-space: pre-line;
        padding: 20px 0 0 0;
        line-height: 20px;
      }
    }

    .v-input {
      padding-top: $spacing-sm;

      .v-input__prepend-outer {
        @media (max-width: $grid-breakpoints.sm) {
          display: none;
        }
      }
    }

    .v-icon {
      color: $colors.shades.black;
    }

    .v-input__slot {
      padding: 0 8px;
    }

    .form-actions {
      text-align: right;

      .trigger {
        color: $colors.shades.white;
        background-color: $colors.secondary;
        border-radius: 4px;
        margin-left: 0;
        margin-right: 0;

        .v-icon {
          margin: 0 8px 0 0;
        }
      }
    }
  }
</style>
