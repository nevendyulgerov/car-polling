import userData from './data/user';
import adminPermissions from './data/adminPermissions';
import timeout from './data/timeout';

export default {
  login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: userData,
            permissions: adminPermissions
          },
          message: 'Success'
        });
      }, timeout);
    });
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {},
          message: 'Success'
        });
      }, timeout);
    });
  },
  register() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {},
          message: 'Success'
        });
      }, timeout);
    });
  }
};
