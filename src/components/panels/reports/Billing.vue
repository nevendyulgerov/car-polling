<template>
  <div
    data-component-group="reports-panel"
    data-component="billing"
    class="elevation-1"
  >
    <div class="billing-label">
      {{ 'Legal business name' }}
    </div>

    <div class="billing-name">
      {{ report.legal_business_name }}
    </div>

    <div class="billing-meta">
      <div class="country">
        <span class="meta-label">
          {{ 'Country:' }}
        </span>
        <span class="meta-value">
          {{ report.country.name }}
        </span>
      </div>
      <div class="vat">
        <span class="meta-label">
          {{ 'Vat / Tax ID:' }}
        </span>
        <span class="meta-value">
          {{ report.vat_id }}
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
    &[data-component="billing"] {
      padding: 30px;
      background-color: $colors.shades.white;
      border-radius: 4px;

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
