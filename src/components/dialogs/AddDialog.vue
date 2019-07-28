<template>
  <div data-component="add-dialog">
    <base-dialog
      :is-on="isOn"
      :content-class="`dialog add-item-dialog ${contentClass}`"
      :is-fullscreen="isFullscreen"
      :max-width="width"
      :on-close="onClose"
    >
      <template slot="title">
        <v-icon>
          {{ icon }}
        </v-icon>
        <h1>
          {{ title }}
        </h1>
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
        default: 'add'
      },
      contentClass: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: 'Edit item'
      },
      width: {
        type: Number,
        default: 800
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
