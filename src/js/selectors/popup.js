import { createSelector } from 'reselect';
import { camelCase } from 'lodash';


const getPopups = state => state.popups;

export const popupSelector = createSelector(
  getPopups,
  popups => {
    let result = {};
    for (let popup of popups) {
      result[camelCase(popup.name)] = {
        title: popup.title,
        text: popup.text,
      };
    }
    return result;
  }
);
