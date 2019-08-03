import axios from 'axios';
import timeout from './data/timeout';
import mockUser from './data/user';
import { apiUrl } from '../../utils/serverApi';

export default {
  login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            Authorization: 'dummy-authorization',
            Role: 'dummy-role',
            User: mockUser,
            message: 'Welcome to Carpooling!'
          }
        });
      }, timeout);
    });
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'Signed out.'
          }
        });
      }, timeout);
    });
  },
  register({ username, firstName, lastName, email, phone, password }) {
    const data = {
      username,
      firstName,
      lastName,
      email,
      phone,
      password
    };

    return axios({
      method: 'post',
      url: `${apiUrl}/users/register`,
      data
    });
  },
  /*
  register() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'Successful registration. You can log in now.'
          }
        });
      }, timeout);
    });
  }
  */
};
