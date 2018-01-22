import axiosMiddleware, { getActionTypes } from 'redux-axios-middleware';

import axiosClient from 'utils/axios-client';


export const onSuccess = ({ action, next, response }, options) => {
  const nextAction = {
    type: getActionTypes(action, options)[1],
    payload: response.data,
    statusCode: response.status,
    request: response.config
  };
  next(nextAction);
  return nextAction;
};

export const onError = ({ action, next, error }, options) => {
  let errorObject;
  if (error instanceof Error) {
    errorObject = error;
  } else {
    errorObject = new Error(error.message);
  }

  const nextAction = {
    type: getActionTypes(action, options)[2],
    statusCode: error.status,
    payload: (error.response && error.response.data) || errorObject
  };
  next(nextAction);
  return nextAction;
};

export default axiosMiddleware(axiosClient, {
  onSuccess,
  onError,
  returnRejectedPromiseOnError: true,
  errorSuffix: '_FAILURE'
});
