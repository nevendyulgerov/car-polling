import Vue from 'vue';
import Vuex from 'vuex';
import initialState from './store/initialState';
import alertsModule from './store/modules/alerts';
import authModule from './store/modules/auth';
import usersModule from './store/modules/users';
import beersModule from './store/modules/beers';
import persistentStore from './store/persistentStore';

Vue.use(Vuex);

const options = {
  modules: {
    alerts: alertsModule(initialState.alerts),
    auth: authModule(initialState.auth),
    users: usersModule(initialState.users),
    beers: beersModule(initialState.beers)
  },
  plugins: [
    persistentStore.plugin
  ]
};

export default new Vuex.Store(options);
