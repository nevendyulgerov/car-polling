<template>
  <div
    data-component="user-menu"
    title="User menu"
  >
    <dialog-confirm
      text="Are you sure you want to logout?"
      :is-on="isLogoutDialogOn"
      :is-loading="isLoggingOut"
      :on-cancel="toggleLogoutDialog"
      :on-confirm="logout"
    />

    <v-menu
      bottom
      offset-y
      content-class="user-menu-content"
      transition="slide-y-transition"
      nudge-bottom="10"
      :close-on-click="true"
      :close-on-content-click="false"
    >
      <v-btn
        slot="activator"
        class="trigger select-item"
        color="secondary"
        dark
        @click="toggle()"
      >
        <v-icon class="icon-avatar">
          account_circle
        </v-icon>
        <span class="user-name">
          {{ userName }}
        </span>
        <v-icon class="icon-chevron">
          keyboard_arrow_down
        </v-icon>
      </v-btn>
      <v-list>
        <template v-for="item in items">
          <v-list-tile
            :key="item.name"
            :value="item"
            color="secondary"
            :class="getItemClass(item)"
            @click="onClickItem(item)"
          >
            <v-list-tile-title>
              {{ item.label }}
            </v-list-tile-title>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import menuItems from '../config/components/userMenu';

  // TODO: Translate component

  export default {
    data() {
      return {
        menuItems,
        isLoggingOut: false,
        isLogoutDialogOn: false
      };
    },
    computed: {
      items() {
        return this.menuItems.map(item => {
          const nextItem = { ...item };

          if (item.name === 'settings') {
            nextItem.redirect = `/users/${this.user.id}/settings`;
            nextItem.paths.push(nextItem.redirect);
          }

          return nextItem;
        });
      },
      user() {
        return this.$store.getters['auth/user'];
      },
      userName() {
        const { firstName, lastName } = this.user;
        return `${firstName} ${lastName}`;
      }
    },
    created() {
      const { path } = this.$route;
      this.menuItems = this.updateItems(this.items, path);

      this.$store.watch(() => {
        const hasErrors = this.$store.getters['alerts/error'].length > 0;

        if (hasErrors) {
          this.isLogoutDialogOn = false;
        }
      }, () => {});
    },
    methods: {
      toggleLogoutDialog() {
        this.isLogoutDialogOn = !this.isLogoutDialogOn;
      },
      getItemClass(lang) {
        return {
          'active-item': lang.isSelected,
          'menu-item': true
        };
      },
      onClickItem(item) {
        if (item.redirect) {
          this.redirect(item.redirect);
        } else if (item.name === 'logout') {
          this.isLogoutDialogOn = true;
        }
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
      },
      logout() {
        this.isLoggingOut = true;

        return this.$store.dispatch('auth/logout')
          .then((res) => {
            this.isLoggingOut = false;
            return res;
          })
          .catch((err) => {
            this.isLoggingOut = false;
            return err;
          });
      }
    }
  };
</script>

<style lang="stylus">
  @import '../assets/stylus/theme.styl';

  [data-component="user-menu"] {
    .trigger.select-item {
      min-width: 60px;
      height: 33px;
      min-height: 33px;
      border-radius: 4px;
      letter-spacing: 0.16px;
      font-weight: 500;
      line-height: 24px;
      padding-right: 6px;
      padding-left: 8px;
      margin: 0;

      @media (max-width: $grid-breakpoints.xs) {
        height: 24px;
      }

      .v-btn__content {
        justify-content: space-between;
      }

      &:not(.active) {
        .icon-chevron {
          transform: rotate(0deg);
          transition: all 0.15s ease-in-out;
        }
      }

      &.active {
        background-color: $colors.primary;

        .icon-chevron {
          transform: rotate(180deg);
          transition: all 0.15s ease-in-out;
        }
      }

      .user-name {
        @media (max-width: $grid-breakpoints.md) {
          display: none;
        }
      }

      .v-icon.icon-chevron {
        font-size: 20px;
        transition: all 0.15s ease-in-out !important;
      }

      .icon-avatar {
        margin: 0 6px 0 0;

        @media (max-width: $grid-breakpoints.xs) {
          font-size: 18px;
        }
      }

      .icon-chevron {
        margin: 0 0 0 10px;

        @media (max-width: $grid-breakpoints.md) {
          margin: 0;
        }
      }

      @media (max-width: $grid-breakpoints.md) {
        font-size: 12px;
      }
    }
  }

  .user-menu-content {
    .menu-item {
      border-bottom: 1px solid $colors.grey.lighten-3;

      &:last-child {
        border: none;
      }

      .v-icon {
        font-size: 22px;
        margin-left: 12px;
      }
    }

    .v-list__tile__title {
      color: $colors.secondary;
    }

    .active-item {
      background-color: $colors.grey.lighten-1;

      .v-list__tile__title {
        color: $colors.shades.white;
      }

      .v-icon {
        color: $colors.shades.white;
      }
    }
  }
</style>
