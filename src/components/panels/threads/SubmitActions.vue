<template>
  <div
    data-component-group="threads-panels"
    data-component="submit-actions"
  >
    <Can
      I="store-deal"
      a="thread"
    >
      <v-btn
        color="secondary"
        class="elevation-4"
        @click="onClick('deal')"
      >
        <v-icon>
          local_offer
        </v-icon>
        {{ 'Submit deal' }}
      </v-btn>
    </Can>
    <Can
      I="store-campaign"
      a="thread"
    >
      <v-btn
        color="secondary"
        class="elevation-4"
        @click="onClick('campaign')"
      >
        <v-icon class="rotated-320">
          content_cut
        </v-icon>
        {{ 'Submit campaign' }}
      </v-btn>
    </Can>
  </div>
</template>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
  };
</script>

<style lang="stylus" scoped>
  [data-component-group="threads-panels"] {
    &[data-component="submit-actions"] {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 0 34px 0;

      .v-btn {
        min-width: 60px;
        height: 33px;
        border-radius: 4px;
        letter-spacing: 0.16px;
        font-weight: 500;
        line-height: 24px;
        padding-left: 8px;
        margin: 0;

        .v-icon {
          margin: 0 6px 0 0;
        }

        &:last-child {
          margin: 0 0 0 16px;
        }
      }
    }
  }
</style>
