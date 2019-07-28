<template>
  <div
    data-component-group="layout"
    data-component="section-header"
  >
    <div class="component-header">
      <h2>
        {{ title }}
      </h2>
      <v-btn
        v-if="hasTrigger"
        class="elevation-0"
        @click="toggle"
      >
        {{ triggerLabel }}
      </v-btn>
    </div>
    <p
      v-if="hasSubtitle"
      class="subtitle"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        default: ''
      },
      hasTrigger: {
        type: Boolean,
        default: true
      },
      triggerLabel: {
        type: String,
        default: 'OK'
      }
    },
    computed: {
      hasSubtitle() {
        return this.subtitle !== '';
      }
    },
    methods: {
      toggle() {
        this.$emit('toggle');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  [data-component-group="layout"] {
    &[data-component="section-header"] {
      background-color: $colors.shades.white;
      padding: 0 0 20px 0;

      > .component-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .subtitle {
        font-size: 15px;
        margin: 8px 0 0 0;
      }

      .v-btn {
        border-radius: 4px;
        margin: 0;
        height: 30px;
        min-height: 30px;

        &:before {
          background-color: $colors.grey.base;
        }
      }
    }
  }
</style>
