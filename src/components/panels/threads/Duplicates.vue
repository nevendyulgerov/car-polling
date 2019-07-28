<template>
  <div
    data-component-group="threads-form"
    data-component="duplicates"
  >
    <v-list
      v-if="hasDuplicates"
      two-line
      class="duplicates-list"
    >
      <template v-for="(thread, index) in duplicates">
        <v-list-tile
          :key="index"
          avatar
          class="duplicate-item"
          :title="`Duplicate deal - ${thread.title}`"
        >
          <v-list-tile-content>
            <div class="duplicate-thread">
              <span class="duplicate-icon">
                <v-icon>
                  report_problem
                </v-icon>
              </span>
              <span class="duplicate-date">
                {{ getDuplicateDate(thread) }}
              </span>
              <span class="duplicate-price">
                {{ getDuplicatePrice(thread) }}
              </span>
              <span class="duplicate-title">
                {{ thread.title }}
              </span>
              <span class="duplicate-link">
                <v-btn
                  :to="`/threads/${thread.id}`"
                  flat
                  small
                >
                  <v-icon>
                    link
                  </v-icon>
                  {{ 'Link' }}
                </v-btn>
              </span>
            </div>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  // TODO: Translate component

  export default {
    props: {
      duplicates: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      hasDuplicates() {
        return this.duplicates.length > 0;
      }
    },
    methods: {
      getDuplicateDate(thread) {
        const createdAt = this.$moment(thread.created_at);
        const today = this.$moment(new Date());
        const yearsDifference = today.diff(createdAt, 'years');
        const monthsDifference = today.diff(createdAt, 'months');

        return yearsDifference > 0
          ? `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`
          : `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
      },
      getDuplicatePrice(thread) {
        return `${thread.price} ${thread.currency.symbol}`;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="threads-form"] {
    &[data-component="duplicates"] {
      .duplicates-list {
        padding-bottom: 0;
        margin: 0 -34px -14px -34px;

        @media (max-width: $grid-breakpoints.sm) {
          margin: 0 -24px -14px -34px;
        }
      }

      .v-list__tile {
        height: 44px;
      }

      .duplicate-item {
        color: $colors.shades.white;
        background-color: $colors.primary;
        border-bottom: 1px solid $colors.shades.white;

        &:last-child {
          border: none;
        }

        .duplicate-thread {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .duplicate-icon {
          .v-icon {
            color: $colors.shades.white;
            margin: 0 6px 0 0;
          }
        }

        .duplicate-date,
        .duplicate-price,
        .duplicate-title {
          &:after {
            content: '|';
            color: $colors.grey.lighten-3;
            margin: 0 6px;
          }
        }

        .duplicate-price {
          @media (max-width: $grid-breakpoints.sm) {
            display: none;
          }
        }

        .duplicate-date {
          @media (max-width: $grid-breakpoints.xs) {
            display: none;
          }
        }

        .duplicate-title {
          font-weight: bold;
        }

        .duplicate-link {
          .v-btn {
            padding-left: 0;
            margin: 0;
            color: $colors.shades.white;

            .v-icon {
              margin: 0 6px 0 0;
            }
          }
        }
      }
    }
  }
</style>
