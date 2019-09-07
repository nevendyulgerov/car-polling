<template>
  <div
    data-component-group="user-panels"
    data-component="passenger"
  >
    <div
      class="passenger-username"
      title="Username"
    >
      {{ username }}
    </div>

    <div class="passenger-status">
      <v-autocomplete
        v-model="status"
        :items="statuses"
        label="Status"
        title="Status"
        item-text="name"
        item-value="name"
        :disabled="isDisabled"
        :return-object="true"
        @change="onChangeStatus"
      />
    </div>

    <Rate
      v-if="canRate"
      :on-rate="onRate"
    />
  </div>
</template>

<script>
  import Rate from '../../forms/trips/Rate';

  export default {
    components: {
      Rate
    },
    props: {
      username: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      canRate: {
        type: Boolean,
        default: false
      },
      onChangeStatus: {
        type: Function,
        required: true
      },
      onRate: {
        type: Function,
        required: true
      }
    },
    computed: {
      statuses() {
        return this.$store.getters['trips/statuses'];
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="user-panels"] {
    &[data-component="passenger"] {
      display: inline-block;
      padding: 12px;
      border-radius: 4px;
      margin: 0 12px 12px 0;
      color: $colors.shades.white;
      background-color: $colors.secondary;

      .passenger-status {
        .v-input {
          margin: 0;
        }

        .v-text-field__details {
          display: none;
        }
      }
    }
  }
</style>
