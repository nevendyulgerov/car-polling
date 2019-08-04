import store from '../../store';
import auth from './auth';
import users from './users';
import trips from './trips';

/**
 * @description Get token
 * @returns {*}
 */
export const getToken = () => store.getters['auth/authorization'];

export default {
  auth,
  users,
  trips
};
