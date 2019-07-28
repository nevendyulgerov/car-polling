import timeout from './data/timeout';

export default {
  login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            Authorization: 'dummy-authorization',
            Role: 'dummy-role'
          },
          message: 'Welcome to Carpooling!'
        });
      }, timeout);
    });
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {},
          message: 'Signed out.'
        });
      }, timeout);
    });
  },
  register() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'Successful registration. You can log in now.'
          },
          message: 'Success'
        });
      }, timeout);
    });
  }
};
