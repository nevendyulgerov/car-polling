import apiClient from 'api-client';
import router from '../../router';
import initialState from '../initialState';
import { isObj, isStr } from '../../utils';
import store from '../../store';
import isAuthorized from '../../utils/authorization';

const authApi = apiClient.auth;

/**
 * @description Is valid
 * @param auth
 * @returns {boolean}
 */
const isValid = (auth) => isObj(auth)
  && isStr(auth.authorization)
  && isStr(auth.role);

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial auth state');
  }

  const { authorization, role } = initialState;
  return {
    authorization,
    role
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  authorization: ({ user }) => user,
  role: ({ role }) => role,
  isLogged: ({ role }) => isStr(role) && role !== '',
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
      const { Authorization, Role } = res.data;
      const nextAuth = {
        ...state,
        authorization: Authorization,
        role: Role
      };

      commit('SET', nextAuth);

      return router.replace({ name: 'index' });
    })
  ),
  register: (context, user) => (
    authApi.register(user).then((res) => {
      handleAlerts(res.data, 'success');
      return router.replace({ name: 'login' });
    })
  ),
  logout: ({ commit }) => (
    authApi.logout().then((res) => {
      handleAlerts(res.data, 'success');
      actions.resetAll({ commit });

      return router.replace({ name: 'index' });
    })
  ),
  reset: ({ commit }) => (
    commit('SET', initialState.auth)
  ),
  resetAll: ({ commit }) => {
    actions.reset({ commit });
    store.dispatch('auth/reset');
    store.dispatch('users/reset');
    store.dispatch('beers/reset');
  },
  set: ({ commit }, auth) => {
    commit('SET', auth);
  }
};

const mutations = {
  SET(state, auth) {
    state.authorization = auth.authorization;
    state.role = auth.role;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
