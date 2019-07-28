import axios from 'axios';
import { getToken, apiUrl } from '../../utils/serverApi';

export default {
  login({ username, password }) {
    console.log('login:;');
    return new Promise((resolve) => {
      resolve({
        data: {
          Authorization: 'dasd',
          Role: 'dasd',
        }
      });
    });
    const fd = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    fd.append('username', username);
    fd.append('password', password);

    return axios.post(`${apiUrl}/login`, fd, config);
  },
  register({ username, firstName, lastName, email, password }) {
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
    fd.append('password', password);

    return axios.post(`${apiUrl}/register`, fd, config);
  },
  logout() {
    const access_token = getToken();

    return axios({
      method: 'post',
      url: `${apiUrl}/auth/logout`,
      data: {
        access_token
      }
    });
  }
};
