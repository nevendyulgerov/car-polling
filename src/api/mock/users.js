import userData from './data/user';
import timeout from './data/timeout';

export default {
  getUsers(queryFilters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {},
          message: 'Success'
        });
      }, timeout);
    });
  },
  createUser(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: userData,
          message: 'Success'
        });
      }, timeout);
    });
  },
  updateUser(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: userData,
          message: 'Success'
        });
      }, timeout);
    });
  },
  getUser(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: userData,
          message: 'Success'
        });
      }, timeout);
    });
  }
};
