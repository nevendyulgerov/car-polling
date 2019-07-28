<template>
  <div
    data-component-group="tabs"
    data-component="logged"
    class="tabs logged-tabs"
  >
    <div class="wrapper">
      <v-list class="list">
        <v-flex class="d-inline-flex">
          <template v-for="item in items">
            <div
              v-if="isAuthorized(item) && isVisibleItem(item)"
              :key="item.name"
              class="list-tile"
            >
              <v-list-tile-content class="tile-content">
                <v-btn
                  v-if="!item.hasSubmenu"
                  :class="['trigger', 'go-to-view', item.isSelected ? 'active' : '']"
                  @click="redirect(item)"
                >
                  <v-icon>
                    {{ item.icon }}
                  </v-icon>
                  <v-list-tile-title>
                    {{ item.label }}
                  </v-list-tile-title>
                </v-btn>

                <v-btn
                  v-else-if="item.hasSubmenu && isSingleSubmenu(item)"
                  :class="['trigger', 'go-to-view', getFirstSubmenuItem(item).isSelected ? 'active' : '']"
                  @click="redirect(getFirstSubmenuItem(item))"
                >
                  <v-icon>
                    {{ getFirstSubmenuItem(item).icon }}
                  </v-icon>
                  <v-list-tile-title>
                    {{ getFirstSubmenuItem(item).label }}
                  </v-list-tile-title>
                </v-btn>

                <v-menu
                  v-else
                  v-model="item.isSubmenuOn"
                  bottom
                  offset-y
                  content-class="logged-tabs-menu"
                  :left="true"
                  :max-height="maxHeight"
                  transition="slide-y-transition"
                  :class="getMenuClass(item)"
                  :close-on-click="true"
                  :close-on-content-click="false"
                >
                  <v-btn
                    slot="activator"
                    class="trigger toggle-menu"
                    dark
                    @click="toggleMenu(item)"
                  >
                    <v-icon>
                      {{ item.icon }}
                    </v-icon>
                    <v-list-tile-title>
                      {{ item.label }}
                    </v-list-tile-title>
                    <v-icon class="icon arrow">
                      keyboard_arrow_down
                    </v-icon>
                  </v-btn>
                  <v-list
                    class="logged-tabs-submenu"
                    :class="getSubmenuClass(item)"
                  >
                    <template v-for="menuItem in item.submenu">
                      <v-list-tile
                        v-if="isAuthorized(menuItem)"
                        :key="menuItem.label"
                        :value="menuItem"
                        class="submenu-item"
                        :class="getSubmenuItemClass(menuItem)"
                        @click="redirect(menuItem)"
                      >
                        <v-icon>
                          {{ menuItem.icon }}
                        </v-icon>
                        <v-list-tile-title class="submenu-label">
                          {{ menuItem.label }}
                        </v-list-tile-title>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-menu>
              </v-list-tile-content>
            </div>
          </template>
        </v-flex>
      </v-list>
    </div>
  </div>
</template>

<script>
  import items from '../../config/components/tabs/logged';

  export default {
    data() {
      return {
        items,
        maxHeight: 300
      };
    },
    mounted() {
      const { path } = this.$route;
      const { items } = this;

      this.items = this.updateItems(items, path);
    },
    methods: {
      getMenuClass(item) {
        return {
          menu: true,
          active: item.isSubmenuOn,
          selected: item.isSelected
        };
      },
      getSubmenuItemClass(item) {
        return {
          selected: item.isSelected
        };
      },
      getSubmenuClass(item) {
        return {
          active: item.isSubmenuOn
        };
      },
      updateItems(items, path) {
        return items.map(item => {
          const nextItem = { ...item };
          const isSelected = nextItem.paths.filter(itemPath => path.indexOf(itemPath) > -1).length > 0;
          let hasSelectedSubmenuItems = false;

          if (nextItem.hasSubmenu) {
            nextItem.submenu = nextItem.submenu.map(submenuItem => ({
              ...submenuItem,
              isSelected: submenuItem.paths.filter(itemPath => path.indexOf(itemPath) > -1).length > 0
            }));

            const selectedMenuItems = nextItem.submenu.filter(i => i.isSelected);
            const targetSelectItem = selectedMenuItems[selectedMenuItems.length - 1];
            hasSelectedSubmenuItems = selectedMenuItems.length > 0;

            if (hasSelectedSubmenuItems && selectedMenuItems.length > 1) {
              nextItem.submenu = nextItem.submenu.map(submenuItem => ({
                ...submenuItem,
                isSelected: submenuItem.name === targetSelectItem.name
              }));
            }
          }

          return {
            ...nextItem,
            isSelected: isSelected || hasSelectedSubmenuItems
          };
        });
      },
      redirect(item) {
        const { redirect, file, api, isFile } = item;

        if (!isFile) {
          if (!redirect) {
            return false;
          }
          return this.$router.push(redirect);
        }

        const query = {
          type: file
        };

        this.$store.dispatch(`${api}/getFile`, query);
      },
      toggleMenu(selectedItem) {
        this.items = this.items.map(item => {
          const nextItem = { ...item };

          if (item.name === selectedItem.name && item.hasSubmenu) {
            nextItem.isSubmenuOn = !item.isSubmenuOn;
          }

          return nextItem;
        });
      },
      isAuthorized(item) {
        return this.$store.getters['auth/isAuthorized'](item.permissions);
      },
      isVisibleItem(item) {
        if (!item.hasSubmenu) {
          return true;
        }

        const visibleItems = item.submenu.filter((subItem) => this.isAuthorized(subItem));
        return visibleItems.length > 0;
      },
      isSingleSubmenu(item) {
        return item.submenu.filter(this.isAuthorized).length === 1;
      },
      getFirstSubmenuItem(item) {
        return item.submenu.filter(this.isAuthorized)[0];
      }
    },
  };
</script>
