import axios from 'axios';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getUsers(queryFilters = {}) {
    const {
      page = 1,
      perPage = 15,
      order = 'asc',
      sort = '',
      search = '',
      role = ''
    } = queryFilters;

    const token = getAccessQuery();
    const query = `${token}&page=${page}&per_page=${perPage}&order=${order}&sort=${sort}&search=${search}&role=${role}`;

    return axios({
      method: 'get',
      url: `${apiUrl}/users${query}`
    });
  },
  getUser(id) {
    const query = getAccessQuery();

    return axios({
      method: 'get',
      url: `${apiUrl}/users/${id}${query}`
    });
  },
  createUser(user) {
    const access_token = getToken();

    return axios({
      method: 'post',
      url: `${apiUrl}/users`,
      data: {
        access_token,
        ...user
      }
    });
  },
  updateUser(user) {
    const query = getAccessQuery();

    return axios({
      method: 'put',
      url: `${apiUrl}/users/${user.id}${query}`,
      data: {
        ...user
      }
    });
  },
  removeUser(id) {
    const query = getAccessQuery();

    return axios({
      method: 'delete',
      url: `${apiUrl}/users/${id}${query}`
    });
  }
};
