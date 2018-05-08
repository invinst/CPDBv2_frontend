import { map, filter } from 'lodash';


export const cardsState = (state, action) => {
  const crPageCrid = action.request.url.replace(/.*cr\/(\d+)\/.+/, '$1');
  const distance = action.request.url.replace(/.*distance=([^&]+).*/, '$1');
  if (crPageCrid === state.meta.crPageCrid && distance === state.meta.distance) {
    const existingCrids = map(state.cards, ({ crid }) => crid);
    const results = filter(action.payload.results, ({ crid }) => existingCrids.indexOf(crid) === -1);
    return {
      meta: {
        crPageCrid,
        distance
      },
      cards: [...state.cards, ...results]
    };
  } else {
    return {
      meta: {
        crPageCrid,
        distance
      },
      cards: action.payload.results
    };
  }
};

export const defaultCardsState = { meta: { crPageCrid: null, distance: null }, cards: [] };
