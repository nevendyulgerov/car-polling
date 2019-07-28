import axios from 'axios';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getBeers(queryFilters = {}) {
    const {
      page = 1,
      perPage = 15,
      order = 'asc',
      sort = '',
      search = '',
      brewery = '',
      country = '',
      abv = 0,
      style = ''
    } = queryFilters;

    return axios({
      method: 'get',
      params: {
        page,
        per_page: perPage,
        order,
        sort,
        search,
        brewery,
        country,
        abv,
        style
      },
      url: `${apiUrl}/beers`
    });
  },
  createBeer(beer) {
    const query = {
      beer_name: beer.name,
      brewery_id: beer.brewery.id,
      country_id: beer.country.country_id,
      abv: beer.abv,
      description: beer.description,
      style_id: beer.style.style_id,
      picture: beer.picture
    };

    return axios({
      method: 'post',
      url: `${apiUrl}/beers`,
      data: {
        ...query
      }
    });
  },
  updateBeer(beer) {
    const query = {
      beer_name: beer.name,
      brewery: beer.brewery,
      country: beer.country,
      abv: beer.abv,
      description: beer.description,
      style: beer.style,
      picture: beer.picture
    };

    return axios({
      method: 'put',
      url: `${apiUrl}/beers/${beer.id}`,
      data: {
        ...query
      }
    });
  },
  removeBeer(id) {
    return axios({
      method: 'delete',
      url: `${apiUrl}/beers/${id}`
    });
  },
  getCountries() {
    return axios({
      method: 'get',
      url: `${apiUrl}/api/countries`,
      headers: {
        Authorization: getToken()
      }
    });
  },
  getBreweries() {
    return axios({
      method: 'get',
      url: `${apiUrl}/api/breweries`,
      headers: {
        Authorization: getToken()
      }
    });
  },
  getStyles() {
    return axios({
      method: 'get',
      url: `${apiUrl}/api/styles`,
      headers: {
        Authorization: getToken()
      }
    });
  }
};
