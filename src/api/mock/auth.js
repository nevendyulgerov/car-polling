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
    const fd = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    fd.append('username', username);
    fd.append('firstName', firstName);
    fd.append('lastName', lastName);
    fd.append('eMail', email);
    fd.append('phone', phone);
    fd.append('password', password);

    console.log({ username, firstName, lastName, email, phone, password });

    return axios.post(`${apiUrl}/register`, fd, config);
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
