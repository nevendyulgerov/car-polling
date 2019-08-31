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
        @change="onChangeStatus"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      onChangeStatus: {
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
      background-color: $colors.primary;

      .passenger-username {

      }

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
