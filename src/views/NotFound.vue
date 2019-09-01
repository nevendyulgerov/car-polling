<template>
  <div data-view="not-found">
    <component
      :is="componentName"
      :has-aside="false"
    >
      <template slot="content">
        <v-layout class="form-wrapper normal">
          <div class="not-found-box">
            <h1>
              {{ 'Page not found' }}
            </h1>
            <div class="subtitle">
              <p>
                {{ 'The link you clicked may be broken or the page may have been removed.' }}
              </p>
              <p>
                <v-btn to="/">
                  {{ 'Visit the homepage' }}
                </v-btn>
              </p>
            </div>
          </div>
        </v-layout>
      </template>
    </component>
  </div>
</template>

<script>
  export default {
    computed: {
      isLogged() {
        return this.$store.getters['auth/isLogged'];
      },
      componentName() {
        return this.$store.getters['auth/isLogged']
          ? 'layout-logged-frame'
          : 'layout-auth-frame';
      }
    },
    metaInfo() {
      return {
        title: 'Not Found'
      };
    }
  };
</script>

<style lang="stylus" scoped>
  [data-view="not-found"] {
    .layout.form-wrapper {
      height: calc(100vh - 250px);
      justify-content: center;
      align-items: center;
    }

    .not-found-box {
      text-align: center;

      h1 {
        font-weight: 800;
        display: inline-block;
        margin: 0 0 20px 0;
        text-transform: uppercase;
      }

      .subtitle {
        text-align: center;
        max-width: 360px;

        p {
          text-align: center;

          &:first-child {
            font-size: 20px;
          }

          &:last-child {
            font-size: 12px;
            text-transform: uppercase;
          }
        }
      }
    }
  }
</style>
