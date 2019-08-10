import apiClient from 'api-client';
import { isObj, isArr } from '../../utils';
import store from '../../store';
import initialState from '../initialState';

const usersApi = apiClient.users;

/**
 * @description Is valid
 * @param users
 * @returns {boolean}
 */
const isValid = (users) => {
  const { activeItem, items, itemsMeta } = users;

  return isObj(activeItem)
    && isArr(items)
    && isObj(itemsMeta);
};

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial users state');
  }

  const { activeItem, items, itemsMeta } = initialState;

  return {
    activeItem,
    items,
    itemsMeta
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  activeItem: ({ activeItem }) => activeItem,
  items: ({ items }) => items,
  itemsMeta: ({ itemsMeta }) => itemsMeta
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
  getUsers: ({ commit, state }, query) => (
    usersApi.getUsers(query).then((res) => {
      const nextItemsData = {
        items: res.data,
        itemsMeta: {}
      };

      const nextState = {
        ...state,
        ...nextItemsData
      };

      commit('SET', nextState);

      return nextItemsData;
    })
  ),
  getUser: ({ commit, state }, query) => (
    usersApi.getUser(query).then((res) => {
      const { activeItem } = state;
      const nextActiveItem = {
        ...activeItem,
        ...res.data
      };

      const nextState = {
        ...state,
        activeItem: nextActiveItem
      };

      commit('SET', nextState);

      return nextActiveItem;
    })
  ),
  createUser: (context, user) => (
    usersApi.createUser(user).then((res) => {
      const nextUser = res.data;

      handleAlerts({
        data: {
          message: 'User created successfully.'
        }
      }, 'success');

      return nextUser;
    })
  ),
  updateUser: ({ commit, state }, user) => {
    const { password, ...restUser } = store.getters['auth/user'];
    const query = {
      ...restUser,
      ...user
    };

    return usersApi.updateUser(query).then((res) => {
      const { activeItem } = state;
      const nextUser = res.data;

      const nextState = {
        ...state,
        activeItem: {
          ...activeItem,
          ...nextUser
        }
      };

      store.dispatch('auth/setUser', nextUser);

      commit('SET', nextState);

      handleAlerts({
        data: {
          message: 'User updated successfully.'
        }
      }, 'success');

      return nextUser;
    });
  },
  setActiveUser: ({ commit, state }, user) => {
    const nextState = {
      ...state,
      activeItem: user
    };

    return commit('SET', nextState);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.users)
  ),
  set: ({ commit }, users) => {
    commit('SET', users);
  }
};

const mutations = {
  SET(state, users) {
    state.activeItem = users.activeItem;
    state.items = users.items;
    state.itemsMeta = users.itemsMeta;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
