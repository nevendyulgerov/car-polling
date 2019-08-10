import axios from 'axios';
import { getToken, apiUrl } from '../../utils/serverApi';

export default {
  fakeLogin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            avatar: '',
            phone: '98782839718',
            rating: 6.5
          }
        });
      }, 500);
    });
  },
  login({ email, password }) {
    const data = {
      email,
      password
    };

    return axios({
      method: 'post',
      url: `${apiUrl}/users/login`,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
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
      }, 500);
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
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
