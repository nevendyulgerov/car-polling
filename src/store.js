import Vue from 'vue';
import Vuex from 'vuex';
import initialState from './store/initialState';
import alertsModule from './store/modules/alerts';
import authModule from './store/modules/auth';
import usersModule from './store/modules/users';
import tripsModule from './store/modules/trips';
import persistentStore from './store/persistentStore';

Vue.use(Vuex);

const options = {
  modules: {
    alerts: alertsModule(initialState.alerts),
    auth: authModule(initialState.auth),
    users: usersModule(initialState.users),
    trips: tripsModule(initialState.trips)
  },
  plugins: [
    persistentStore.plugin
  ]
};

export default new Vuex.Store(options);
