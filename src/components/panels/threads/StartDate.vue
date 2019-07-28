<template>
  <div
    data-component-group="thread-panels"
    data-component="start-date"
  >
    <div
      v-if="isToday || isTomorrow"
      :class="getDateLabelClass()"
    >
      <span class="label-box">
        {{ label }}
      </span>
    </div>
    <span class="date">
      <v-icon v-if="isToday || isTomorrow">
        access_time
      </v-icon>
      {{ date }}
    </span>
    <span
      v-if="!isToday && !isTomorrow"
      class="hour"
    >
      <v-icon>
        access_time
      </v-icon>
      {{ hour }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      startDate: {
        type: String,
        required: true
      }
    },
    computed: {
      today() {
        return this.$moment();
      },
      label() {
        return this.isToday ? 'Today' : 'Tomorrow';
      },
      date() {
        return this.isToday || this.isTomorrow
          ? this.$moment(this.startDate).format('HH:mm')
          : this.$moment(this.startDate).format('YYYY-MM-DD');
      },
      hour() {
        return this.$moment(this.startDate).format('HH:mm');
      },
      isToday() {
        return this.today.diff(this.$moment(this.startDate), 'days') === 0;
      },
      isTomorrow() {
        return this.today.diff(this.$moment(this.startDate), 'days') === 1;
      }
    },
    methods: {
      getDateLabelClass() {
        return {
          'date-label': true,
          'is-tomorrow': this.isTomorrow
        };
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../assets/stylus/theme.styl';

  [data-component-group="thread-panels"] {
    &[data-component="start-date"] {
      .date-label {
        .label-box {
          display: inline-block;
          padding: 4px 12px;
          margin: 0 0 6px 0;
          border-radius: 20px;
          line-height: 16px;
          letter-spacing: 0.32px;
          color: $colors.shades.white;
          background-color: $colors.error;
        }

        &.is-tomorrow {
          .label-box {
            background-color: $colors.grey.darken-3;
          }
        }
      }

      .date {
        font-size: 14px;
        color: $colors.grey.darken-4;
      }

      .date,
      .hour {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .v-icon {
          font-size: 22px;
          margin: 0 6px 0 0;
        }
      }
    }
  }
</style>
