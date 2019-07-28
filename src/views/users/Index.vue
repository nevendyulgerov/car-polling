<template>
  <div data-view="users">
    <layout-logged-frame>
      {{ 'Users' }}
    </layout-logged-frame>
  </div>
</template>

<script>
  export default {
    data() {},
    metaInfo() {
      return {
        title: 'Users'
      };
    }
  };
</script>

<style lang="stylus">
  .v-datatable {
    min-width: $min-table-width;
  }
</style>
