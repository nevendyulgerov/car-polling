<template></template>

<script>
  const { VUE_APP_IDLE_TIMEOUT_MINUTES } = process.env;

  export default {
    data() {
      return {
        events: ['click', 'keypress', 'scroll'],
        idleTime: 0, // minutes
        idleTimeout: VUE_APP_IDLE_TIMEOUT_MINUTES,
        countTimeout: 60000 // milliseconds
      };
    },
    created() {
      this.addListeners();
      setInterval(this.timerIncrement, this.countTimeout);
    },
    beforeDestroy() {
      this.removeListeners();
    },
    methods: {
      addListeners() {
        this.events.forEach((event) => (
          window.addEventListener(event, this.interceptInteraction)
        ));
      },
      removeListeners() {
        this.events.forEach((event) => (
          window.removeEventListener(event, this.interceptInteraction)
        ));
      },
      interceptInteraction() {
        this.idleTime = 0;
      },
      timerIncrement() {
        this.idleTime += 1;

        if (this.idleTime > this.idleTimeout) {
          this.idleTime = 0;
          const isLogged = this.$store.getters['auth/isLogged'];

          if (isLogged) {
            return this.$store.dispatch('auth/logout');
          }
        }
      }
    }
  };
</script>
