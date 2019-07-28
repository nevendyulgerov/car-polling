<template>
  <div
    data-component-group="billing-panel"
    data-component="conflicts"
  >
    <div class="error-message">
      <v-icon>
        report_problem
      </v-icon>

      <span class="message">
        {{ conflict.error_message }}
      </span>
    </div>

    <div
      v-for="diff in conflict.diff"
      :key="diff.field"
      class="conflict-item"
    >
      <AmountLabel
        :label="diff.field.split('_').map((word) => titlizeName(word)).join(' ')"
        :value="diff.value"
      />
    </div>
  </div>
</template>

<script>
  import AmountLabel from '../../labels/Amount';
  import { titlize } from '../../../utils';

  export default {
    components: {
      AmountLabel
    },
    props: {
      conflict: {
        type: Object,
        required: true
      }
    },
    methods: {
      titlizeName(word) {
        return titlize(word);
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="billing-panel"] {
    &[data-component="conflicts"] {
      margin-top: -20px;

      .error-message {
        font-size: 18px;
        color: $colors.primary;
        margin: 0 0 20px 0;

        .v-icon {
          color: $colors.primary;
        }
      }

      .conflict-item {
        [data-component="amount"] {
          padding: 0 32px 10px 32px;
          margin: 0 -32px 10px -32px;
          border-bottom: 1px solid $colors.grey.lighten-2;

          .item-label {
            font-weight: bold;
            color: $colors.shades.black;
          }
        }

        &:last-child {
          [data-component="amount"] {
            padding-bottom: 0;
            margin-bottom: 0;
            border: 0;
          }
        }
      }
    }
  }
</style>
