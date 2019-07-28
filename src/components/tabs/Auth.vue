<template>
  <div
    data-component-group="tabs"
    data-component="auth"
    class="tabs"
  >
    <div class="wrapper">
      <v-list class="list">
        <v-flex class="d-inline-flex">
          <template v-for="item in items">
            <v-list-tile
              :key="item.name"
              :class="getListClass(item)"
              @click="redirect(item.redirect)"
            >
              <v-icon>
                {{ item.icon }}
              </v-icon>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.label" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-flex>
      </v-list>
    </div>
  </div>
</template>

<script>
  import items from '../../config/components/tabs/auth';

  export default {
    data() {
      return {
        items,
      };
    },
    created() {
      const { path } = this.$route;
      const { items } = this.$data;

      this.items = this.updateItems(items, path);
    },
    methods: {
      getListClass(item) {
        return {
          active: item.isSelected,
          'list-tile': true
        };
      },
      updateItems: (items, path) => items.map(item => {
        const selectedPaths = item.paths.filter(itemPath => path.indexOf(itemPath) > -1);

        return {
          ...item,
          isSelected: selectedPaths.length > 0
        };
      }),
      redirect(path) {
        this.$router.push(path);
      }
    },
  };
</script>
