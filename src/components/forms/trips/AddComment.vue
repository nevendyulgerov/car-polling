<template>
  <div
    data-component-group="trips-form"
    data-component="add-comment"
    class="elevation-2"
  >
    <slot name="beforeForm" />

    <template>
      <form @:submit.prevent="onSubmit">
        <base-text-editor
          :value="comment"
          :height="220"
          :config="editorConfig"
          :disabled="isDisabled"
          @input="onChangeComment"
        />

        <div class="form-actions">
          <v-btn
            color="primary"
            class="trigger elevation-4"
            depressed
            :disabled="isDisabled || comment === ''"
            :loading="isLoading"
            @click="submit"
          >
            <v-icon>
              mode_comment
            </v-icon>
            {{ 'Post comment' }}
          </v-btn>
        </div>
      </form>
    </template>

    <slot name="afterForm" />
  </div>
</template>

<script>
  import { isObj } from '../../../utils';

  export default {
    props: {
      trip: {
        type: Object,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      onSubmit: {
        type: Function,
        required: true
      }
    },
    data: () => ({
      comment: '',
      editorConfig: {
        placeholder: 'Type comment here...',
        btns: [
          ['bold', 'italic', 'underline', 'del'],
          ['unorderedList', 'orderedList'],
          ['link', 'removeformat']
        ]
      },
      isSubmitted: false
    }),
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      }
    },
    watch: {
      trip(nextVal) {
        if (isObj(nextVal)) {
          this.clear();
        }
      }
    },
    created() {
      this.$watch(() => {
        const hasErrors = this.$store.getters['alerts/error'].length > 0;

        if (hasErrors && this.isSubmitted) {
          this.isSubmitted = false;
        }
      });
    },
    methods: {
      cancel() {
        this.clear();
        this.onCancel();
      },
      validate() {
        this.$v.$touch();
        return this.canSubmitRequest() && !this.$v.error && !this.$v.pending;
      },
      submit() {
        if (!this.validate()) {
          return false;
        }

        this.addComment();
      },
      clear() {
        this.$v.$reset();
        this.comment = '';
        this.isSubmitted = false;
      },
      addComment() {
        this.isSubmitted = true;
        return this.onSubmit(this.comment)
          .then(() => {
            const hasErrors = this.$store.getters['alerts/error'].length > 0;
            if (hasErrors) {
              return false;
            }

            return this.clear();
          });
      },
      canSubmitRequest() {
        const { comment, isSubmitted } = this;

        return comment !== ''
          && !isSubmitted;
      },
      onChangeComment(comment) {
        this.comment = comment;
      }
    },
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="trips-form"] {
    &[data-component="add-comment"] {
      background-color: $colors.shades.white;
      padding: 16px;
      border-radius: 2px;

      .form-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px 0 0 0;

        .v-btn {
          border-radius: 4px;

          &.trigger {
            height: 30px;
            min-height: 30px;
            font-size: 14px;

            .v-icon {
              font-size: 20px;
              margin: 0 6px 0 0;
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .comment-editor {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .editor-box {
          width: auto;
        }
      }
    }
  }
</style>
