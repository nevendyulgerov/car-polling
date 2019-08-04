import axios from 'axios';
import { getToken, getAccessQuery, apiUrl } from '../../utils/serverApi';

export default {
  getTrips(queryFilters = {}) {
    const {
      page = 1,
      perPage = 15,
      order = 'asc',
      sort = '',
      origin = '',
      destination = ''
    } = queryFilters;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [{
            id: 2,
            driver: {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@email.com',
              avatar: '',
              phone: '98782839718',
              rating: 6.5
            },
            carModel: 'Honda Civic',
            message: 'Lorem ipsum dolor sit amet.',
            departureTime: '2019-08-17T22:24:56.525',
            origin: 'Sofia',
            destination: 'Plovdiv',
            availablePlaces: 0,
            passengers: null,
            tripStatus: null,
            comment: null,
            smoking: true,
            pets: false,
            luggage: true
          }, {
            id: 3,
            driver: {
              id: 2,
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'jane.doe@email.com',
              avatar: '',
              phone: '898787363123',
              rating: 6.5
            },
            carModel: 'Mitsubishi Evolution',
            message: 'Hey there',
            departureTime: '2019-08-14T18:24:56.525',
            origin: 'Sofia',
            destination: 'Stara Zagora',
            availablePlaces: 3,
            passengers: null,
            tripStatus: null,
            comment: null,
            smoking: false,
            pets: false,
            luggage: true
          }, {
            id: 4,
            driver: {
              id: 3,
              firstName: 'Stan',
              lastName: 'Marsh',
              email: 'stanny.boy@email.com',
              avatar: '',
              phone: '93810928930',
              rating: 4.5
            },
            carModel: 'Golf Petichka',
            message: 'Golfeca e basi qkata kola, maina',
            departureTime: '2019-08-10T19:24:56.525',
            origin: 'Plovdiv',
            destination: 'Veliko Turnovo',
            availablePlaces: 2,
            passengers: null,
            tripStatus: null,
            comment: null,
            smoking: false,
            pets: true,
            luggage: false
          }]
        });
      });
    });

    /*
    return axios({
      method: 'get',
      params: {
        page,
        per_page: perPage,
        order,
        sort,
        origin,
        destination
      },
      url: `${apiUrl}/trips`
    });
     */
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
