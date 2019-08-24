import axios from 'axios';
import { getToken, apiUrl } from '../../utils/serverApi';

export default {
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
  me() {
    return axios({
      method: 'get',
      url: `${apiUrl}/users/me`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
  },
  getUserAvatar({ id }) {
    return axios({
      method: 'get',
      url: `${apiUrl}/users/${id}/avatar`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
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
  register({ firstName, lastName, email, phone, password }) {
    const data = {
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
