<template>
  <div
    data-component-group="dropdown"
    data-component="months"
  >
    <v-menu
      v-model="isOn"
      bottom
      offset-y
      :max-height="maxHeight"
      transition="slide-y-transition"
      nudge-bottom="10"
      content-class="month-actions"
      :close-on-click="true"
      :close-on-content-click="false"
    >
      <v-btn
        slot="activator"
        class="trigger toggle-menu"
        color="primary"
        small
        dark
        round
        :class="getTriggerClass()"
        @click="toggleMenu()"
      >
        {{ formatMonth(activeMonth) }}
        <v-icon>
          keyboard_arrow_down
        </v-icon>
      </v-btn>

      <v-list class="default-list">
        <v-list-tile
          v-for="(monthItem, index) in months"
          :key="index"
          :value="monthItem.month"
          :class="getMonthClass(monthItem)"
          @click="selectItem(monthItem)"
        >
          <v-list-tile-title>
            {{ formatMonth(monthItem) }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import { toInt, isObj } from '../../utils';

  export default {
    props: {
      selectedMonth: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onChange: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        maxHeight: 500,
        months: [],
        isOn: false,
      };
    },
    computed: {
      activeMonth() {
        const month = this.months.find(({ month }) => month === this.selectedMonth);
        return isObj(month) ? month : {};
      }
    },
    created() {
      this.months = this.getMonths();
    },
    methods: {
      getMonths() {
        const { selectedMonth, $moment } = this;
        const month = toInt($moment().format('MM'));
        let monthIndex = 0;
        const months = [];

        while (monthIndex < month) {
          const targetMonth = $moment().subtract(monthIndex, 'months');
          const start = toInt(targetMonth.startOf('month').format('DD'));
          const end = toInt(targetMonth.endOf('month').format('DD'));

          months.push({
            month: targetMonth.format('MMMM'),
            year: targetMonth.format('YYYY'),
            start,
            end,
            selected: targetMonth.format('MMMM') === selectedMonth
          });

          monthIndex += 1;
        }

        return months;
      },
      toggleMenu() {
        this.isOn = !this.isOn;
      },
      getTriggerClass() {
        return {
          active: this.isOn,
        };
      },
      getMonthClass({ month }) {
        return {
          'month-tile': true,
          selected: month === this.selectedMonth
        };
      },
      selectItem(month) {
        this.toggleMenu();

        this.onChange(month);
      },
      formatMonth(monthItem) {
        return `${monthItem.start} - ${monthItem.end} ${monthItem.month} ${monthItem.year}`;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../assets/stylus/theme.styl';

  .month-actions {
    .v-list__tile__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .v-icon {
        margin: 0 6px 0 0;
      }
    }

    .month-tile {
      &.selected {
        .v-list__tile__title {
          color: $colors.primary;
        }
      }
    }
  }

  [data-component-group="dropdown"] {
    &[data-component="months"] {
      display: inline-block;

      .v-menu {
        width: 100%;
      }

      .v-input {
        padding: 0;
        margin: 0;
      }

      .trigger.toggle-menu {
        width: 100%;
        margin: 0;
        border-radius: 30px;

        &:not(.active) {
          .v-icon {
            &:last-child {
              transform: rotate(0deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }

        &.active {
          background-color: $colors.primary;

          .v-icon {
            &:last-child {
              transform: rotate(180deg);
              transition: all 0.15s ease-in-out;
            }
          }
        }
      }

      .v-btn {
        margin: 0;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 4px;

        .v-icon {
          margin: 0 0 0 6px;
        }
      }
    }
  }
</style>
