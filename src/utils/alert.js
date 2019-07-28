import { eachKey, isObj } from './index';

/**
 * @description Add alerts
 * @param resData
 * @param alertType
 */
const addAlerts = (resData, alertType = 'error') => {
  const data = resData.data || {
    message: resData.message
  };

  const { message, validations } = data;
  let nextAlerts = [];

  if (!isObj(validations)) {
    nextAlerts = [{
      type: 'general',
      alertType,
      messages: [message]
    }];
  } else {
    eachKey(validations, (type, messages) => {
      nextAlerts.push({
        type,
        alertType,
        messages
      });
    });
  }

  return nextAlerts;
};

export default addAlerts;
