import { UPDATE_PATH_NAME } from 'utils/constants';


const updatePathNameMiddleware = store => next => action => {
  if (action.type === UPDATE_PATH_NAME) {
    const pathName = action.payload;
    global.history.replaceState(global.history.state, document.title, pathName);
  }
  return next(action);
};

export default updatePathNameMiddleware;
