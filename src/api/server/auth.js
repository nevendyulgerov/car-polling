import axios from 'axios';
import { getToken, apiUrl } from '../../utils/serverApi';

export default {
  fakeLogin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            idToken: 'abdasd'
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
  fakeMe() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        });
      }, 500);
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
  fakeGetUserAvatar() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: 'https://www.alessandromichelazzi.com/wp-content/uploads/2018/02/google-pixel-2-sample-photos-Cover-1.jpg'
        });
      }, 500);
    });
  },
  getUserAvatar({ id }) {
    return axios({
      method: 'get',
      url: `${apiUrl}/users/${id}/avatar`,
      headers: {
        'Content-Type': 'image/jpeg',
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
