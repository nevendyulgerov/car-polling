<template>
  <v-app>
    <v-content>
      <router-view />
      <AlertsManager />
      <IdleManager />
    </v-content>
  </v-app>
</template>

<script>
  import AlertsManager from './components/AlertsManager';
  import IdleManager from './components/IdleManager';

  export default {
    name: 'App',
    components: {
      AlertsManager,
      IdleManager
    },
    data() {
      return {
        permissions: []
      };
    },
    metaInfo() {
      const title = 'Car Pooling';

      return {
        title,
        titleTemplate: `%s | ${title}`
      };
    }
  };
</script>
