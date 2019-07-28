<template>
  <div data-component="edit-dialog">
    <base-dialog
      :is-on="isOn"
      :content-class="`dialog edit-item-dialog ${contentClass}`"
      :is-fullscreen="isFullscreen"
      :max-width="width"
      :on-close="onClose"
    >
      <template slot="title">
        <div class="title-box">
          <v-btn
            flat
            :ripple="false"
            class="trigger view-item"
          >
            <v-icon>
              {{ icon }}
            </v-icon>
            <div
              class="title-wrapper"
              :title="title"
            >
              <h1>
                {{ title }}
              </h1>
            </div>
          </v-btn>
        </div>
        <v-btn
          class="elevation-0 trigger close-dialog"
          @click="onClose"
        >
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </template>
      <template slot="content">
        <slot name="content" />
      </template>
    </base-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'edit'
      },
      title: {
        type: String,
        default: 'Edit item'
      },
      width: {
        type: Number,
        default: 800
      },
      contentClass: {
        type: String,
        default: ''
      },
      isError: {
        type: Boolean,
        default: false
      },
      isOn: {
        type: Boolean,
        required: true
      },
      isFullscreen: {
        type: Boolean,
        default: false
      },
      onClose: {
        type: Function,
        default: () => {}
      }
    }
  };
</script>
