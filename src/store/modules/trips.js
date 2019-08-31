import apiClient from 'api-client';
import { isObj, isArr } from '../../utils';
import store from '../../store';
import initialState from '../initialState';

const tripsApi = apiClient.trips;

/**
 * @description Is valid
 * @param trips
 * @returns {boolean}
 */
const isValid = (trips) => {
  const { activeItem, items, itemsMeta, statuses } = trips;

  return isObj(activeItem)
    && isArr(items)
    && isObj(itemsMeta)
    && isArr(statuses);
};

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial trips state');
  }

  const { activeItem, items, itemsMeta, statuses } = initialState;

  return {
    activeItem,
    items,
    itemsMeta,
    statuses
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  activeItem: ({ activeItem }) => activeItem,
  items: ({ items }) => items,
  itemsMeta: ({ itemsMeta }) => itemsMeta,
  statuses: ({ statuses }) => statuses
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
    tripsApi.getCategories()
  ),
  getTrips: ({ commit, state }, query) => (
    tripsApi.getTrips(query).then((res) => {
      const nextItemsData = {
        items: res.data.content,
        itemsMeta: {
          number: res.data.number,
          last: res.data.last,
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages
        }
      };

      const nextState = {
        ...state,
        ...nextItemsData
      };

      commit('SET', nextState);

      return nextItemsData;
    })
  ),
  filterTrips: ({ commit, state }, query) => (
    tripsApi.filterTrips(query).then((res) => {
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
  getTrip: ({ commit, state }, query) => (
    tripsApi.getTrip(query).then((res) => {
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
  createTrip: ({ commit, state }, trip) => (
    tripsApi.createTrip(trip).then((res) => {
      const nextTrip = res.data;
      const nextItems = [
        ...state.items,
        nextTrip
      ];

      const nextState = {
        ...state,
        items: nextItems
      };

      commit('SET', nextState);

      handleAlerts({
        data: {
          message: 'Trip created successfully.'
        }
      }, 'success');

      return nextItems;
    })
  ),
  updateTrip: ({ commit, state }, trip) => (
    tripsApi.updateTrip(trip).then((res) => {
      const nextTrip = res.data;
      const nextItems = state.items.map((item) => {
        return item.id === nextTrip.id
          ? nextTrip
          : item;
      });

      const nextState = {
        ...state,
        items: nextItems
      };

      commit('SET', nextState);

      handleAlerts({
        data: {
          message: 'Trip updated successfully.'
        }
      }, 'success');

      return nextItems;
    })
  ),
  setActiveTrip: ({ commit, state }, trip) => {
    const nextState = {
      ...state,
      activeItem: trip
    };

    return commit('SET', nextState);
  },
  getPassengerStatuses: ({ commit, state }) => (
    tripsApi.getPassengerStatuses().then((res) => {
      const statuses = res.data;

      const nextState = {
        ...state,
        statuses
      };

      commit('SET', nextState);

      return statuses;
    })
  ),
  changePassengerStatus: (context, query) => (
    tripsApi.changePassengerStatus(query).then((res) => res.data)
  ),
  applyForTrip: (context, query) => (
    tripsApi.applyForTrip(query).then((res) => res.data)
  ),
  reset: ({ commit }) => (
    commit('SET', initialState.trips)
  ),
  set: ({ commit }, trips) => {
    commit('SET', trips);
  }
};

const mutations = {
  SET(state, trips) {
    state.activeItem = trips.activeItem;
    state.items = trips.items;
    state.itemsMeta = trips.itemsMeta;
    state.statuses = trips.statuses;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
