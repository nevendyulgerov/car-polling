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
    created() {
      this.updateAbility();
    },
    methods: {
      updateAbility() {
        this.permissions = this.$store.getters['auth/permissions'];
        this.$ability.update(this.permissions);
      }
    },
    metaInfo() {
      const title = 'Beer Tag';

      return {
        title,
        titleTemplate: `%s | ${title}`
      };
    }
  };
</script>
