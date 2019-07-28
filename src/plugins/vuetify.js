import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VApp from 'vuetify/es5/components/VApp';
import VGrid from 'vuetify/es5/components/VGrid';
import 'vuetify/src/stylus/app.styl';
import transitions from 'vuetify/es5/components/transitions';
import colors from 'vuetify/es5/util/colors';
import '../assets/stylus/main.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp,
    VGrid,
    transitions,
  },
  theme: {
    primary: colors.orange.darken2,
    secondary: colors.grey.darken3,
    accent: colors.orange.darken2,
    error: colors.red.darken1,
    warning: colors.yellow.darken2,
    info: colors.grey.darken3,
    success: colors.green.darken1,
  },
  breakpoint: {
    thresholds: {
      xs: 420
    },
    scrollbarWidth: 10
  }
});
