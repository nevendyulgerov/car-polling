import Vue from 'vue';
import Router from 'vue-router';
import multiguard from 'vue-router-multiguard';
import routes from './routes';
import {
  redirectUnauthenticated,
  redirectAuthenticated,
  redirectUnauthorized,
  redirectFromIndex
} from './routes/traps/traps';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  saveScrollPosition: true,
  routes,
});

router.beforeEach(multiguard([
  redirectUnauthenticated,
  redirectAuthenticated,
  redirectUnauthorized,
  redirectFromIndex
]));

export default router;
