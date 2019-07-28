<template>
  <div data-component="dialog">
    <v-dialog
      v-model="isOn"
      persistent
      :fullscreen="isFullscreen"
      :content-class="`dialog ${contentClass}`"
      :max-width="`${maxWidth}px`"
      hide-overlay
    >
      <v-card class="dialog-frame">
        <v-card-title class="title">
          <slot name="title" />
        </v-card-title>
        <v-card-text v-if="hasContent">
          <v-container
            grid-list-md
            class="content"
          >
            <slot name="content" />
          </v-container>
        </v-card-text>
        <v-card-actions class="actions">
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      isOn: {
        type: Boolean,
        required: true
      },
      maxWidth: {
        type: Number,
        default: 600
      },
      isCloseOnEscapeKey: {
        type: Boolean,
        default: true
      },
      isFullscreen: {
        type: Boolean,
        default: false
      },
      hasContent: {
        type: Boolean,
        default: true,
      },
      contentClass: {
        type: String,
        default: ''
      },
      onClose: {
        type: Function,
        default: () => {}
      }
    },
    watch: {
      isOn(nextVal) {
        if (nextVal) {
          document.documentElement.classList.add('hide-scroll');
        } else {
          document.documentElement.classList.remove('hide-scroll');
        }
      }
    },
    created() {
      if (this.isCloseOnEscapeKey) {
        this.attachKeypressListener();
      }
    },
    beforeDestroy() {
      if (this.isCloseOnEscapeKey) {
        this.detachKeypressListener();
      }
    },
    methods: {
      attachKeypressListener() {
        window.addEventListener('keydown', this.monitorKeyPress);
      },
      detachKeypressListener() {
        window.removeEventListener('keydown', this.monitorKeyPress);
      },
      monitorKeyPress({ key }) {
        if (this.isOn && key === 'Escape') {
          this.onClose();
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/theme.styl';

  .dialog {
    .dialog-frame {
      background-color: $colors.grey.lighten-4;
    }

    .actions {
      padding: 0;
    }

    .content {
      padding: 0;
    }

    .title {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      line-height: 1.4 !important;
    }

    .v-card__title {
      padding: 32px;
    }

    .v-card__text {
      padding: 0 32px 32px 32px;
    }
  }
</style>
