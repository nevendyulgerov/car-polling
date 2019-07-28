import axios from 'axios';
import store from '../store';
import { getToken } from '../api/server';
import { isStr } from './index';

let isFetchingAccessToken = false;
let refreshSubscribers = [];
let parallelRequests = 0;
const maxParallelRequests = process.env.VUE_APP_API_MAX_PARALLEL_REQUESTS;
let requestQueue = [];

/**
 * @description Postpone request
 * @param url
 * @param method
 * @param callback
 */
const postponeRequest = (url, method, callback) => {
  const isUniqueRequest = refreshSubscribers
    .filter(subscriber => subscriber.url === url && subscriber.method === method)
    .length === 0;

  if (isUniqueRequest) {
    refreshSubscribers.push({ url, method, callback });
  }
};

/**
 * @description Call postponed requests
 */
const callPostponedRequests = () => {
  refreshSubscribers.forEach(({ callback }) => callback());
  refreshSubscribers = [];
};

/**
 * @description Replace request token
 * @param request
 * @returns {*}
 */
const replaceRequestToken = (request) => {
  const { url, data } = request;
  const nextToken = getToken();
  const nextUrl = url.replace(
    /access_token=([a-z]|[A-Z]|\d)+/,
    `access_token=${nextToken}`
  );

  const nextRequest = {
    ...request,
    url: nextUrl
  };

  if (isStr(data)) {
    const nextData = JSON.parse(data);

    if (isStr(nextData.access_token)) {
      nextData.access_token = nextToken;
    }

    nextRequest.data = JSON.stringify(nextData);
  }

  return nextRequest;
};

/**
 * @description Transform postponed request
 * @param request
 * @param resolve
 */
const transformPostponedRequest = (request, resolve) => {
  const { url, method } = request;

  postponeRequest(url, method, () => {
    const nextRequest = replaceRequestToken(request);
    resolve(axios(nextRequest));
  });
};

/**
 * @description Handle alerts
 * @param data
 * @param alertType
 */
const handleAlerts = (data, alertType = 'error') => (
  store.dispatch('alerts/set', {
    data,
    alertType
  })
);

/**
 * @description Add to request queue
 * @param config
 * @param resolve
 */
const addToRequestQueue = (config, resolve) => {
  requestQueue.push(() => resolve(config));
};

/**
 * @description Call postponed requests
 */
const callRequestQueue = () => {
  if (requestQueue.length > 0) {
    const [firstInQueue, ...remainingRequests] = requestQueue;
    firstInQueue();
    requestQueue = remainingRequests;
  }

  if (parallelRequests > 0) {
    parallelRequests -= 1;
  }
};

/**
 * Set Global defaults
 */
export const setDefault = (key, value) => {
  axios.defaults[key] = value;
};

/**
 * Set Global headers config
 */
export const headers = (key, value, valueKey) => {
  // skip empty/no values
  if (!value || (typeof valueKey !== 'undefined' && !value[valueKey])) {
    return;
  }

  let header = value;

  // extract the data
  if (valueKey) {
    header = value[valueKey];
  }

  // Ex. axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.common[key] = header;
};

/**
 * @description Request interceptor
 * @param config
 * @returns {*}
 */
const requestInterceptor = (config) => {
  if (parallelRequests < maxParallelRequests) {
    parallelRequests += 1;
    return config;
  }

  // add request to request queue
  return new Promise((resolve) => (
    addToRequestQueue(config, resolve)
  ));
};

/**
 * @description Response success handler
 * @param res
 * @returns {*}
 */
const responseSuccessHandler = (res) => {
  callRequestQueue();

  return res;
};

const standardizeErrorObj = (res) => {
  res.data.message = res.data.message || res.statusText;
  res.data.data = res.data.data || {};
  res.data.data.message = res.data.data.message || res.data.message;

  return res;
};

/**
 * @description Response error handler
 * @param err
 * @returns {*}
 */
const responseErrorHandler = (err) => {
  callRequestQueue();

  let res = err.response;

  if (res && res.data) {
    res = standardizeErrorObj(res);

    // TODO: Consider using a more strict evaluation, not relying on string comparison
    const isUnauthenticatedErr = res.status === 401
      && res.data.data.message === 'Unauthenticated.';

    // handle authorized/public errors
    if (!isUnauthenticatedErr) {
      handleAlerts(res.data);
      return Promise.reject(err);
    }

    // process unauthenticated error
    if (!isFetchingAccessToken) {
      isFetchingAccessToken = true;

      // attempt to refresh token
      store.dispatch('auth/refreshToken')
        .then(() => (
          callPostponedRequests()
        ))
        .catch(() => (
          store.dispatch('auth/redirectInvalidToken')
        ))
        .finally(() => {
          isFetchingAccessToken = false;
        });
    }

    // postpone all requests while refreshing token
    return new Promise((resolve) => (
      transformPostponedRequest(err.config, resolve)
    ));
  }

  // handle generic error
  handleAlerts({
    data: {
      message: 'Network error. Please try again.'
    }
  });

  return Promise.reject(err);
};

axios.interceptors.request.use(
  requestInterceptor
);

axios.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);
