import axiosMiddleware, { getActionTypes } from 'redux-axios-middleware';

import axiosClient from 'utils/axios-client';


export const getErrorMessage = (url, status) => (`Request to ${url} failed with status code ${status}.`);

export const onSuccess = ({ action, next, response }, options) => {
  const nextAction = {
    type: getActionTypes(action, options)[1],
    payload: response.data,
    statusCode: response.status
  };
  next(nextAction);
  return nextAction;
};

export const onError = ({ action, next, error }, options) => {
  let errorObject;
  if (error instanceof Error) {
    errorObject = error;
  } else {
    const errorMessage = error.data ? error.data.message
      : getErrorMessage(action.payload.request.url, error.status);
    errorObject = new Error(errorMessage);
  }

  const nextAction = {
    type: getActionTypes(action, options)[2],
    statusCode: error.status,
    payload: error.data || errorObject
  };
  next(nextAction);
  return nextAction;
};

export default axiosMiddleware(axiosClient, {
  onSuccess,
  onError,
  errorSuffix: '_FAILURE'
});
