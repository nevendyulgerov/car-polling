import axios from 'axios';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getUsers(queryFilters = {}) {
    const {
      page = 1,
      perPage = 15,
      order = 'asc',
      sort = '',
      search = ''
    } = queryFilters;

    const params = {
      page,
      per_page: perPage,
      sort,
      order
    };

    if (search !== '') {
      params.username = search;
    }

    return axios({
      method: 'get',
      url: `${apiUrl}/users/all`,
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
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
    return axios({
      method: 'put',
      url: `${apiUrl}/users`,
      data: {
        ...user
      }
    });
  }
};
