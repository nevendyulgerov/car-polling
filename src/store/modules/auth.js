import apiClient from 'api-client';
import router from '../../router';
import initialState from '../initialState';
import { isObj, isNull } from '../../utils';
import store from '../../store';
import isAuthorized from '../../utils/authorization';

const authApi = apiClient.auth;

/**
 * @description Is valid
 * @param auth
 * @returns {boolean}
 */
const isValid = (auth) => isObj(auth)
  && isNull(auth.user);

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial auth state');
  }

  const { authorization, role, user } = initialState;
  return {
    authorization,
    role,
    user
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  user: ({ user }) => user,
  isLogged: ({ user }) => isObj(user),
  isAuthorized: ({ permissions = [] }) => (requestedPermissions = []) => (
    isAuthorized(permissions, requestedPermissions)
  )
};

/**
 * @description Handle alerts
 * @param data
 * @param alertType
 */
const handleAlerts = (data, alertType = 'error') => (
  store.dispatch('alerts/set', {
    data,
    alertType
  })
);

const actions = {
  login: ({ commit, state }, userAuth) => (
    authApi.login(userAuth).then((res) => {
      const nextUser = res.data;
      const nextAuth = {
        ...state,
        user: nextUser
      };

      commit('SET', nextAuth);

      return router.replace({ name: 'index' });
    })
  ),
  register: (context, user) => (
    authApi.register(user).then((res) => {
      router.replace({ name: 'login' });

      return handleAlerts(res.data, 'success');
    })
  ),
  logout: ({ commit }) => (
    authApi.logout().then((res) => {
      actions.resetAll({ commit });
      router.replace({ name: 'index' });

      return handleAlerts(res.data, 'success');
    })
  ),
  reset: ({ commit }) => (
    commit('SET', initialState.auth)
  ),
  resetAll: ({ commit }) => {
    actions.reset({ commit });
    store.dispatch('auth/reset');
    store.dispatch('users/reset');
    store.dispatch('trips/reset');
  },
  set: ({ commit }, auth) => {
    commit('SET', auth);
  }
};

const mutations = {
  SET(state, auth) {
    state.user = auth.user;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
