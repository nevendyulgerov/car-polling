import axios from 'axios';
import moment from 'moment';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getTrips(queryFilters = {}) {
    const {
      page = 0,
      perPage = 15,
      order = 'asc',
      sort = '',
      origin = '',
      destination = '',
      departureDates = '',
      availablePlaces = -1,
      smoking,
      luggage,
      pets,
    } = queryFilters;

    const params = {
      page,
      size: perPage,
      order,
      sort,
      smoking,
      luggage,
      pets
    };

    if (origin !== '') {
      params.origin = origin;
    }

    if (destination !== '') {
      params.destination = destination;
    }

    if (departureDates !== '') {
      const [earliestDepartureTime, latestDepartureTime] = departureDates.split(' - ');

      params.earliestDepartureTime = moment(earliestDepartureTime).format('YYYY-MM-DD[T]HH:mm:ss');

      if (latestDepartureTime) {
        params.latestDepartureTime = moment(latestDepartureTime).format('YYYY-MM-DD[T]HH:mm:ss');
      }
    }

    if (availablePlaces > -1) {
      params.availablePlaces = availablePlaces;
    }

    return axios({
      method: 'get',
      url: `${apiUrl}/trips`,
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
  },
  filterTrips(queryFilters = {}) {
    const { origin = '', destination = '' } = queryFilters;

    const params = {};

    if (origin !== '') {
      params.origin = origin;
    }

    if (destination !== '') {
      params.destination = destination;
    }

    return axios({
      method: 'get',
      url: `${apiUrl}/trips`,
      params
    });
  },
  createTrip(trip) {
    console.warn('createTrip::');
    console.log(trip);

    /*
    return axios({
      method: 'post',
      url: `${apiUrl}/trips`,
      data: {
        ...trip
      }
    });
     */
  },
  updateTrip(trip) {
    console.warn('updateTrip::');
    console.log(trip);

    /*
    return axios({
      method: 'put',
      url: `${apiUrl}/trips/${trip.id}`,
      data: {
        ...trip
      }
    });
     */
  }
};
