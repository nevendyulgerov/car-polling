import beerData from './data/beer';
import timeout from './data/timeout';

export default {
  getBeers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [beerData, beerData, beerData],
          message: 'Success'
        });
      }, timeout);
    });
  },
  createBeer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: beerData,
          message: 'Success'
        });
      }, timeout);
    });
  },
  updateBeer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: beerData,
          message: 'Success'
        });
      }, timeout);
    });
  },
  getBeer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: beerData,
          message: 'Success'
        });
      }, timeout);
    });
  },
};
