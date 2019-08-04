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
      params.search = search;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [{
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://www.alessandromichelazzi.com/wp-content/uploads/2018/02/google-pixel-2-sample-photos-Cover-1.jpg'
          }, {
            id: 2,
            firstName: 'Jane',
            lastName: 'Due',
            avatar: 'https://i.ytimg.com/vi/XGSIU39Y7WU/maxresdefault.jpg'
          }]
        });
      });
    });

    /*
    return axios({
      method: 'get',
      url: `${apiUrl}/users`,
      params
    });
     */
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
  }
};
