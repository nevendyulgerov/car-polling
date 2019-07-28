<template>
  <div data-component="alerts-manager">
    <AbsoluteBox
      :left="alertBoxPos.left"
      :bottom="alertBoxPos.bottom"
      :is-fixed="true"
      class-name="global-alert-box"
    >
      <template v-if="alerts.length > 0">
        <v-alert
          v-for="(authAlert, index) in alerts"
          :key="authAlert.type"
          :value="authAlert.isOn"
          :type="authAlert.alertType"
          transition="scale-transition"
          :dismissible="true"
          @input="turnOffAlert(index)"
        >
          {{ authAlert.messages[0] }}
        </v-alert>
      </template>
    </AbsoluteBox>
  </div>
</template>

<script>
  import AbsoluteBox from './layout/AbsoluteBox';

  export default {
    components: {
      AbsoluteBox
    },
    data() {
      return {
        alertBoxPos: {
          left: 0,
          bottom: 0
        },
        alerts: []
      };
    },
    created() {
      this.$store.watch(() => {
        const allAlerts = this.$store.getters['alerts/all'];

        if (this.alerts.length === 0 && allAlerts.length > 0) {
          this.monitorAlerts(allAlerts);
        }
      }, () => {});
    },
    methods: {
      monitorAlerts(alerts) {
        this.alerts = alerts.map(alert => ({
          ...alert,
          isOn: true
        }));

        if (alerts.length > 0) {
          this.dismissAlerts();
        }
      },
      turnOffAlert(alertIndex, clearTimeout = 100) {
        this.alerts = this.alerts.map((alert, index) => ({
          ...alert,
          isOn: index !== alertIndex && alert.isOn
        }));

        const hasActiveAlerts = this.alerts.filter(alert => alert.isOn).length > 0;
        if (!hasActiveAlerts) {
          setTimeout(() => this.clearAlerts(), clearTimeout);
        }
      },
      turnOffAlerts() {
        this.alerts = this.alerts.map(authError => ({
          ...authError,
          isOn: false
        }));
      },
      dismissAlerts(timeout = 10000, clearTimeout = 300) {
        setTimeout(() => {
          this.turnOffAlerts();
          setTimeout(() => this.clearAlerts(), clearTimeout);
        }, timeout);
      },
      clearAlerts() {
        this.alerts = [];
        return this.$store.dispatch('alerts/dismiss');
      }
    }
  };
</script>
