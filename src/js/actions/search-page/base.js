import { createAction } from 'redux-actions';


export const moveFunction = (upAction, downAction) => (direction, totalItemCount) => {
  const DIRECTION_TO_ACTION = {
    'up': upAction,
    'down': downAction,
  };

  return createAction(DIRECTION_TO_ACTION[direction])({ totalItemCount });
};
