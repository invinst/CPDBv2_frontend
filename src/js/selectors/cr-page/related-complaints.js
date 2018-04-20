import { createSelector } from 'reselect';
import { compact } from 'lodash';

import extractQuery from 'utils/extract-query';


const getRelatedComplaintsByCategory = state => state.crPage.relatedComplaints.relatedByCategory;

const getRelatedComplaintsByOfficer = state => state.crPage.relatedComplaints.relatedByOfficer;

const getRelatedComplaintsByCategoryCount = createSelector(
  getRelatedComplaintsByCategory,
  ({ count }) => count
);

const getRelatedComplaintsByOfficerCount = createSelector(
  getRelatedComplaintsByOfficer,
  ({ count }) => count
);

const getRelatedComplaintsByCategoryNextParams = createSelector(
  getRelatedComplaintsByCategory,
  ({ pagination }) => extractQuery(pagination.next)
);

const getRelatedComplaintsByOfficerNextParams = createSelector(
  getRelatedComplaintsByOfficer,
  ({ pagination }) => extractQuery(pagination.next)
);

const cardTransform = (card) => ({
  crid: card.crid,
  lat: card.point.lat,
  lon: card.point.lon,
  categories: card['category_names'].join(', '),
  complainants: card.complainants.map(
    ({ age, gender, race }) => compact([race, gender, age ? `Age ${age}` : null]).join(' ')
  ).join(', '),
  accuseds: card['coaccused'].join(', ')
});

const cardByCategorySelector = createSelector(
  getRelatedComplaintsByCategory,
  ({ cards }) => {
    return cards.cards.map(cardTransform);
  }
);

const cardByOfficerSelector = createSelector(
  getRelatedComplaintsByOfficer,
  ({ cards }) => {
    return cards.cards.map(cardTransform);
  }
);

const getRelatedComplaintsByCategoryHasMore = createSelector(
  getRelatedComplaintsByCategoryCount,
  cardByCategorySelector,
  (count, cards) => cards.length < count
);

const getRelatedComplaintsByOfficerHasMore = createSelector(
  getRelatedComplaintsByOfficerCount,
  cardByOfficerSelector,
  (count, cards) => cards.length < count
);

export const cardSelector = (state, props) => (
  props.match === 'categories'
    ? cardByCategorySelector(state, props)
    : cardByOfficerSelector(state, props)
);

export const countSelector = (state, props) => (
  props.match === 'categories'
    ? getRelatedComplaintsByCategoryCount(state, props)
    : getRelatedComplaintsByOfficerCount(state, props)
);

export const nextParamsSelector = (state, props) => (
  props.match === 'categories'
    ? getRelatedComplaintsByCategoryNextParams(state, props)
    : getRelatedComplaintsByOfficerNextParams(state, props)
);

export const hasMoreSelector = (state, props) => (
  props.match === 'categories'
    ? getRelatedComplaintsByCategoryHasMore(state, props)
    : getRelatedComplaintsByOfficerHasMore(state, props)
);
