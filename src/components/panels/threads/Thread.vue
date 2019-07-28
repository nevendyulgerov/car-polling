<template>
  <div
    data-component-group="thread-panels"
    data-component="thread"
  >
    <div
      v-if="isDeal"
      class="thread-image"
    >
      <v-img
        :src="hasImage ? thread.image_thumb : placeholder"
        :lazy-src="hasImage ? thread.image_thumb : placeholder"
        aspect-ratio="1"
        :contain="true"
        class="white lighten-2 elevation-2"
      >
        <template slot="placeholder">
          <v-layout
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-img
              :src="placeholder"
              aspect-ratio="1"
              class="grey lighten-2"
            />
          </v-layout>
        </template>
      </v-img>
    </div>
    <div class="thread-details">
      <div
        v-if="isCampaign"
        class="campaign-label"
      >
        <v-icon class="rotated-320">
          content_cut
        </v-icon>
        {{ 'Campaign' }}
      </div>

      <template v-if="showTags && thread.labels.length > 0">
        <TagsList :tags="thread.labels" />
      </template>

      <div class="thread-title">
        {{ thread.title }}
      </div>

      <div @click="onClick">
        <v-expansion-panel
          class="thread-description-panel"
        >
          <v-expansion-panel-content>
            <template slot="header">
              <div class="meta-dropdown-box">
                {{ 'Description' }}
              </div>
            </template>
            <div
              class="thread-description"
              v-html="thread.description"
            ></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>

      <div @click="toggleComments">
        <v-expansion-panel
          v-if="hasComments"
          class="comments-panel"
        >
          <v-expansion-panel-content>
            <template slot="header">
              <div class="meta-dropdown-box">
                {{ `Comments (${thread.comments.length})` }}
              </div>
            </template>
            <CommentsList
              v-if="hasComments"
              :comments="thread.comments"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>

      <div class="price-meta">
        <div
          v-if="isDeal"
          class="thread-price"
        >
          {{ `${thread.price} ${thread.currency.symbol}` }}
        </div>
        <div
          v-else-if="isCampaign"
          class="thread-discount"
        >
          {{ threadDiscount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentsList from '../../lists/Comments';
  import TagsList from '../../lists/Tags';
  import { isStr, isObj } from '../../../utils';
  import placeholder from '../../../assets/images/placeholder.png';

  // TODO: Translate component

  export default {
    components: {
      CommentsList,
      TagsList
    },
    props: {
      thread: {
        type: Object,
        default() {
          return {};
        }
      },
      showTags: {
        type: Boolean,
        default: false
      },
      onToggleComments: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        placeholder,
        areCommentsOn: false
      };
    },
    computed: {
      hasImage() {
        return isStr(this.thread.image_thumb);
      },
      isDeal() {
        return isObj(this.thread.type) && this.thread.type.name.toLowerCase() === 'deal';
      },
      isCampaign() {
        return isObj(this.thread.type) && this.thread.type.name.toLowerCase() === 'campaign';
      },
      threadDiscount() {
        const { thread } = this;
        const { discount = {} } = thread;
        const { type = {} } = discount;
        const isFixedType = type.name.toLowerCase() === 'fixed';

        return `-${discount.amount} ${isFixedType ? `${thread.currency.symbol}` : '%'}`;
      },
      hasComments() {
        return this.thread.comments_count > 0;
      }
    },
    methods: {
      onClick(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      toggleComments(event) {
        this.onClick(event);

        this.onToggleComments(this.thread, this.areCommentsOn, () => {
          this.areCommentsOn = !this.areCommentsOn;
        });
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="thread"] {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .thread-image {
        width: 90px;
        padding: 0 16px 0 0;

        .v-image {
          max-width: 80px;
          border-radius: 4px;
        }
      }

      .thread-details {
        width: calc(100% - 80px);

        .v-expansion-panel {
          width: 100%;
        }
      }

      p {
        font-size: 14px;
        margin: 0 0 10px 0;

        &:last-child {
          margin: 0;
        }
      }

      .thread-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.16px;
      }

      .thread-title,
      .thread-price,
      .thread-discount {
        font-weight: 500;
        color: $colors.grey.darken-4;
      }

      .thread-discount {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .thread-price {
        display: inline-block;
      }

      .price-meta {
        display: inline-block;
        margin: 0 10px 0 0;
      }

      .meta-dropdown-box {
        display: inline-block;
        color: $colors.grey.darken-1;
      }

      .v-expansion-panel {
        box-shadow: none;
      }

      .v-expansion-panel__header__icon {
        display: inline-block;
        position: relative;
        top: 5px;
        color: $colors.grey.darken-1;
      }

      .thread-description-panel {
        padding: 2px 0;
        margin: -4px 0 4px 0;
      }

      .comments-panel {
        padding: 2px 0;
        margin: -12px 0 2px 0;
      }

      .thread-description {
        padding: 8px;
        max-width: 400px;
        word-break: break-word;
        color: $colors.grey.darken-4;
        background-color: $colors.grey.lighten-2;
        border-radius: 4px;
      }

      .v-list__tile__avatar {
        min-width: 40px;
      }

      .v-expansion-panel__header {
        width: auto;
        display: inline-block;
        margin: 0 0 4px 0;
        padding: 0;
        box-shadow: none;
        min-height: auto;
      }

      .v-expansion-panel__container {
        background-color: transparent !important;

        &.v-expansion-panel__container--active {
          .v-expansion-panel__header {
            .meta-dropdown-box {
              color: $colors.primary;
            }

            .v-expansion-panel__header__icon {
              .v-icon {
                color: $colors.primary;
              }
            }
          }
        }
      }

      .campaign-label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        color: $colors.primary;
        margin: 0 0 8px 0;
        font-weight: 400;

        .v-icon {
          color: $colors.primary;
          margin: 0 6px 0 0;
          font-size: 18px;
        }
      }

      [data-component="tags"] {
        .tags-list {
          padding: 0 0 4px 0;
        }
      }
    }
  }
</style>
