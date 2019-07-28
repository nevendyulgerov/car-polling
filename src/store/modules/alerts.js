import { isObj, isArr } from '../../utils';
import addAlerts from '../../utils/alert';
import initialState from '../initialState';

/**
 * @description Is valid
 * @param alerts
 * @returns {boolean}
 */
const isValid = (alerts) => isObj(alerts)
  && isArr(alerts.info)
  && isArr(alerts.success)
  && isArr(alerts.warning)
  && isArr(alerts.error);

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial alerts state');
  }

  const { info, success, warning, error } = initialState;
  return {
    info,
    success,
    warning,
    error
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  all: ({ info, success, warning, error }) => [
    ...info,
    ...success,
    ...warning,
    ...error
  ],
  info: ({ info }) => info,
  success: ({ success }) => success,
  warning: ({ warning }) => warning,
  error: ({ error }) => error
};

const actions = {
  set: ({ commit, state }, { data, alertType = 'error' }) => {
    const incomingAlerts = addAlerts(data, alertType);
    const nextAlerts = [...state[alertType], ...incomingAlerts];

    commit('SET', {
      alerts: nextAlerts,
      type: alertType
    });
  },
  reset: ({ commit }) => (
    commit('SET', initialState.alerts)
  ),
  dismiss: ({ commit }) => {
    commit('DISMISS');
  }
};

const mutations = {
  SET(state, { alerts, type }) {
    state[type] = alerts;
  },
  DISMISS(state) {
    state.info = [];
    state.success = [];
    state.warning = [];
    state.error = [];
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
