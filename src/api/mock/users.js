import userData from './data/user';
import timeout from './data/timeout';

export default {
  getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {},
          message: 'Success'
        });
      }, timeout);
    });
  },
  getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: userData,
          message: 'Success'
        });
      }, timeout);
    });
  },
  updateUser() {
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
