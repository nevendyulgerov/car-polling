<template>
  <div
    data-component-group="lists"
    data-component="comments"
  >
    <v-list
      two-line
      class="comments-list"
    >
      <template v-for="(comment, index) in comments">
        <v-list-tile
          :key="index"
          avatar
          class="comment-item"
        >
          <v-list-tile-avatar>
            <v-icon class="avatar-icon">
              account_circle
            </v-icon>
          </v-list-tile-avatar>

          <div class="tile-wrapper">
            <v-list-tile-title>
              <span class="actor">
                {{ getActorName(comment) }}
              </span>
            </v-list-tile-title>

            <span
              class="comment"
              v-html="comment.message"
            />
          </div>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      comments: {
        type: Array,
        required: true
      },
      spinnerWidth: {
        type: Number,
        default: 3
      },
      spinnerSize: {
        type: Number,
        default: 24
      }
    },
    methods: {
      getActorName({ author }) {
        return `${author.firstName} ${author.lastName}`;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  [data-component-group="lists"] {
    &[data-component="comments"] {
      margin-top: 24px;

      .spinner {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .comments-list {
        overflow-x: hidden;
        border-radius: 4px;
        padding-top: 0;
        background-color: $colors.grey.lighten-3;
      }

      .v-list__tile__title {
        font-size: 13px;
        color: $colors.grey.darken-4;
      }

      .comment-action {
        font-size: 12px;
        margin: 6px 0 0 -30px;
        width: calc(100% + 20px);
      }

      .comment-item {
        padding: 0;
        border-bottom: 1px solid $colors.grey.lighten-3;

        &:last-child {
          border: none;
        }
      }

      .avatar-icon {
        font-size: 22px;
        color: $colors.grey.darken-4;
      }

      .action {
        color: $colors.grey.base;
      }

      .comment {
        display: block;
        margin: 6px 0 0 -30px;
        width: calc(100% + 20px);
        height: auto;
        word-break: break-word;
        font-size: 14px;
        padding: 8px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        color: $colors.grey.darken-2;
        background-color: $colors.shades.white;

        p {
          font-size: 14px;
          margin-bottom: 8px;
          color: $colors.grey.darken-4;
        }
      }

      .actor {
        position: relative;
        bottom: 2px;
      }

      .timestamp {
        display: block;
        margin: 0 0 0 -30px;
        padding: 0 8px 8px 8px;
        width: calc(100% + 20px);
        color: $colors.grey.base;
        background-color: $colors.shades.white;
        font-size: 12px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      .v-list__tile {
        height: auto;
        min-height: auto;
        padding: 0;
        align-items: flex-start;
      }

      .v-list__tile__avatar {
        min-width: 36px;
      }

      .tile-wrapper {
        width: 100%;
        padding: 10px 0 0 0;
      }
    }
  }
</style>
