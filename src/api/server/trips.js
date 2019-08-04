import axios from 'axios';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getTrips(queryFilters = {}) {
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
      url: `${apiUrl}/trips`
    });
  },
  createTrip(trip) {
    const query = {
      beer_name: trip.name,
      brewery_id: trip.brewery.id,
      country_id: trip.country.country_id,
      abv: trip.abv,
      description: trip.description,
      style_id: trip.style.style_id,
      picture: trip.picture
    };

    return axios({
      method: 'post',
      url: `${apiUrl}/beers`,
      data: {
        ...query
      }
    });
  },
  updateTrip(trip) {
    const query = {
      beer_name: trip.name,
      brewery: trip.brewery,
      country: trip.country,
      abv: trip.abv,
      description: trip.description,
      style: trip.style,
      picture: trip.picture
    };

    return axios({
      method: 'put',
      url: `${apiUrl}/trips/${trip.id}`,
      data: {
        ...query
      }
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
