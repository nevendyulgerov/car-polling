import store from '../store';

/**
 * @description Api url
 * @type {string}
 */
export const apiUrl = `${process.env.VUE_APP_API}`;

/**
 * @description Get token
 * @returns {*}
 */
export const getToken = () => store.getters['auth/authorization'];

/**
 * @description Get access query
 * @returns {string}
 */
export const getAccessQuery = () => `?access_token=${getToken()}`;
