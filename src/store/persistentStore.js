import VuexPersistence from 'vuex-persist';
import initialState from './initialState';

const { localStorage, sessionStorage } = window;

/**
 * @description Local store
 * @type {VuexPersistence<any>}
 */
export const localStore = new VuexPersistence({
  storage: localStorage,
  /*
  // TODO: Consider deprecating store reducer
  reducer: (state) => ({
    token: state.auth.token
  })
  */
});

/**
 * @description Session store
 * @type {VuexPersistence<any>}
 */
export const sessionStore = new VuexPersistence({
  storage: sessionStorage,
  reducer: (state) => {
    const nextAlerts = initialState.alerts;

    return {
      ...state,
      alerts: nextAlerts
    };
  }
});
