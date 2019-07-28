<template>
  <div
    v-if="hasLimits"
    data-component="limits"
  >
    <h3 v-if="hasTitle">
      {{ title }}
    </h3>
    <div class="limit-box">
      <v-progress-linear
        :value="dailyProgress"
        :color="dailyColor"
        :height="height"
      />
      <span class="limit-label">
        {{ `Daily (${daily} / ${maxDaily})` }}
      </span>
    </div>
    <div class="limit-box" >
      <v-progress-linear
        :value="weeklyProgress"
        :color="weeklyColor"
        :height="height"
      />
      <span class="limit-label">
        {{ `Weekly (${weekly} / ${maxWeekly})` }}
      </span>
    </div>
  </div>
</template>

<script>
  import colors from 'vuetify/es5/util/colors';
  import { isObj } from '../utils';

  // TODO: Translate component

  export default {
    props: {
      title: {
        type: String,
        default: 'Business Limits'
      },
      height: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        progress: 65,
        colors
      };
    },
    computed: {
      activeUser() {
        return this.$store.getters['auth/user'];
      },
      limits() {
        return this.$store.getters['businessUsers/limits'];
      },
      hasLimits() {
        return isObj(this.limits.business);
      },
      maxDaily() {
        return this.hasLimits ? this.limits.business.max_deals_per_day : 0;
      },
      maxWeekly() {
        return this.hasLimits ? this.limits.business.max_deals_per_week : 0;
      },
      daily() {
        return this.hasLimits ? this.limits.business.posted_deals_per_day : 0;
      },
      weekly() {
        return this.hasLimits ? this.limits.business.posted_deals_per_week : 0;
      },
      dailyColor() {
        const { dailyProgress, colors } = this;

        return dailyProgress < 33
          ? colors.green.base
          : dailyProgress < 66
            ? colors.warning
            : colors.red.base;
      },
      weeklyColor() {
        const { weeklyProgress, colors } = this;

        return weeklyProgress < 33
          ? colors.green.base
          : weeklyProgress < 66
            ? colors.warning
            : colors.red.base;
      },
      dailyProgress() {
        const { daily, maxDaily } = this;
        return this.getProgress(daily, maxDaily);
      },
      weeklyProgress() {
        const { weekly, maxWeekly } = this;
        return this.getProgress(weekly, maxWeekly);
      },
      hasTitle() {
        return this.title !== '';
      }
    },
    created() {
      this.getLimits();
    },
    methods: {
      getProgress(used, max) {
        return (used / max) * 100;
      },
      getLimits() {
        const query = {
          id: this.activeUser.id
        };
        return this.$store.dispatch('businessUsers/getLimits', query);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/theme.styl';

  [data-component="limits"] {
    padding: 10px;
    margin: 0 0 30px 0;
    border-radius: 4px;
    background-color: $colors.shades.white;

    .limit-box {
      .limit-label {
        display: block;
        font-size: 12px;
        margin: -10px 0 0 0;
      }
    }
  }
</style>
