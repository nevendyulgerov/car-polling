<template>
  <div
    data-component-group="threads-panel"
    data-component="latest-deals"
  >
    <v-list
      two-line
      class="merchant-deals-list"
    >
      <template v-for="deal in deals">
        <v-list-tile
          :key="deal.id"
          class="merchant-deal-item"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              {{ deal.title }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span class="deal-price">
                {{ `${deal.price}${deal.currency.symbol}` }}
              </span>
              <div class="deal-meta">
                <span class="deal-time">
                  {{ getDealTime(deal) }}
                </span>
                <span class="separator">
                  {{ '|' }}
                </span>
                <span class="deal-poster">
                  {{ `@${deal.poster}` }}
                </span>
              </div>
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              ripple
              :title="`View deal '${deal.title}'`"
              @click="viewDeal(deal)"
            >
              <v-icon color="grey lighten-1">
                info
              </v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      deals: {
        type: Array,
        required: true
      }
    },
    computed: {
      today() {
        return this.$moment();
      }
    },
    methods: {
      getDealTime(deal) {
        return this.getDate(deal.date);
      },
      viewDeal(deal) {
        const dealWindow = window.open();
        dealWindow.opener = null;
        dealWindow.location = deal.url;
      },
      isToday(date) {
        return this.today.diff(this.$moment(date), 'days') === 0;
      },
      isSameHour(date) {
        return this.today.diff(this.$moment(date), 'hours') === 0;
      },
      getDate(date) {
        return this.isToday(date) && this.isSameHour(date)
          ? `${this.$moment(date).format('mm')} minutes ago`
          : this.isToday(date)
            ? `${this.today.diff(date, 'hours')} hours ago`
            : this.$moment(date).format('YYYY-MM-DD');
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="threads-panel"] {
    &[data-component="latest-deals"] {
      .v-list {
        background: transparent;
      }

      .deal-price {
        color: $colors.shades.black;
        font-weight: bold;
        margin: 0 6px 0 0;
      }

      .deal-meta {
        display: inline-block;

        .separator {
          margin: 0 4px;
        }
      }
    }
  }
</style>
