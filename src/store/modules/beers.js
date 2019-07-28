import apiClient from 'api-client';
import { isObj, isArr } from '../../utils';
import store from '../../store';
import initialState from '../initialState';
import beersServerApi from '../../api/server/beers';

const beersApi = apiClient.beers;


/**
 * @description Is valid
 * @param beers
 * @returns {boolean}
 */
const isValid = (beers) => {
  const { activeItem, items, itemsMeta } = beers;

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
    throw Error('Invalid initial beers state');
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
  getCategories: () => (
    beersServerApi.getCategories()
  ),
  getBeers: ({ commit, state }, query) => (
    beersApi.getBeers(query).then((res) => {
      const nextItemsData = {
        items: res.data
      };

      const nextState = {
        ...state,
        ...nextItemsData
      };

      commit('SET', nextState);

      return nextItemsData;
    })
  ),
  getBeer: ({ commit, state }, query) => (
    beersApi.getBeer(query).then((res) => {
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
  getCountries: () => (
    beersApi.getCountries().then(res => res.data)
  ),
  getBreweries: () => (
    beersApi.getBreweries().then(res => res.data)
  ),
  getStyles: () => (
    beersApi.getStyles().then(res => res.data)
  ),
  createBeer: ({ commit, state }, beer) => (
    beersApi.createBeer(beer).then((res) => {
      const nextBeer = res.data;
      const nextItems = [
        ...state.items,
        nextBeer
      ];

      const nextState = {
        ...state,
        items: nextItems
      };

      commit('SET', nextState);

      handleAlerts({
        data: {
          message: 'Beer created successfully.'
        }
      }, 'success');

      return nextItems;
    })
  ),
  updateBeer: ({ commit, state }, beer) => (
    beersApi.updateBeer(beer).then((res) => {
      const nextBeer = res.data;
      const nextItems = state.items.map((item) => {
        return item.id === nextBeer.id
          ? nextBeer
          : item;
      });

      const nextState = {
        ...state,
        items: nextItems
      };

      commit('SET', nextState);

      handleAlerts({
        data: {
          message: 'Beer updated successfully.'
        }
      }, 'success');

      return nextItems;
    })
  ),
  removeBeer: (context, user) => (
    beersApi.removeBeer(user).then(() => (
      handleAlerts({
        data: {
          message: 'Beer removed successfully.'
        }
      }, 'success')
    ))
  ),
  setActiveBeer: ({ commit, state }, beer) => {
    const nextState = {
      ...state,
      activeItem: beer
    };

    return commit('SET', nextState);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.beers)
  ),
  set: ({ commit }, beers) => {
    commit('SET', beers);
  }
};

const mutations = {
  SET(state, beers) {
    state.activeItem = beers.activeItem;
    state.items = beers.items;
    state.itemsMeta = beers.itemsMeta;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
