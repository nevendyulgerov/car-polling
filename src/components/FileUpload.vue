<template>
  <div data-component="file-upload">
    <v-btn color="secondary">
      <VueUploadComponent
        ref="upload"
        v-model="files"
        @input-file="inputFile"
        @input-filter="inputFilter"
      >
        <v-icon v-if="icon !== ''">
          {{ icon }}
        </v-icon>
        <span class="btn-label">
          {{ triggerLabel }}
        </span>
      </VueUploadComponent>
    </v-btn>
  </div>
</template>

<script>
  import VueUploadComponent from 'vue-upload-component';
  import { isStr, isObj, isFunc } from '../utils';

  export default {
    components: {
      VueUploadComponent
    },
    props: {
      triggerLabel: {
        type: String,
        default: 'Upload'
      },
      icon: {
        type: String,
        default: 'file_upload'
      },
      onFilter: {
        type: Function,
        default: undefined
      },
      onChange: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        files: []
      };
    },
    methods: {
      inputFile(newFile) {
        if (!isObj(newFile) || !isStr(newFile.name)) {
          return false;
        }

        this.onChange(newFile);
      },
      inputFilter(newFile, oldFile, prevent) {
        const hasFile = newFile && !oldFile;

        if (hasFile && isFunc(this.onFilter) && this.onFilter(newFile)) {
          return prevent();
        }
      }
    }
  };
</script>

<style lang="stylus">
  [data-component="file-upload"] {
    display: inline-block;

    .v-btn {
      padding: 0;
      border-radius: 4px;

      .v-icon {
        margin: 0 6px 0 0;
      }
    }

    .file-uploads {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 16px;
      cursor: pointer;
    }

    .file-uploads.file-uploads-html5 label {
      cursor: pointer !important;
    }
  }
</style>
