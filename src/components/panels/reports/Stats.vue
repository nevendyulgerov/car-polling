<template>
  <div
    data-component-group="reports-panel"
    data-component="stats"
    class="elevation-1"
  >
    <div class="flex-item clickouts">
      <div class="meta">
        <span class="meta-value">
          {{ report.monthly_clickouts }}
        </span>
        <span class="meta-label">
          {{ 'Clickouts (Estimated)' }}
        </span>
      </div>
    </div>

    <div class="flex-item rate">
      <div class="meta">
        <span class="meta-value">
          {{ `${report.currency.symbol} ${report.report_rate}` }}
        </span>
        <span class="meta-label">
          {{ 'Contract rate' }}
        </span>
      </div>
    </div>

    <div class="flex-item commission">
      <div class="meta">
        <span class="meta-value">
          {{ `${report.currency.symbol} ${report.monthly_commission}` }}
        </span>
        <span class="meta-label">
          {{ 'Commission (Estimated)' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      report: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="reports-panel"] {
    &[data-component="stats"] {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 4px;

      > .flex-item {
        width: 33.33%;

        &:first-child {
          .meta {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }

        &:last-child {
          .meta {
            text-align: center;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            background-color: $colors.grey.lighten-4;

            .meta-value {
              font-weight: bold;
            }
          }
        }

        .meta {
          display: flex;
          flex-direction: column;
          padding: 30px;
          background-color: $colors.shades.white;

          .meta-value {
            font-size: 24px;
          }

          .meta-label {
            color: $colors.grey.base;
          }
        }
      }

      .billing-label {
        color: $colors.grey.base;
      }

      .billing-name {
        margin: 20px 0;
        font-size: 22px;
        font-weight: bold;
      }

      .billing-meta {
        max-width: 320px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .meta-label {
          color: $colors.grey.base;
        }
      }
    }
  }
</style>
