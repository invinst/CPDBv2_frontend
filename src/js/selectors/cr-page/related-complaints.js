import { createSelector } from 'reselect';
import { compact } from 'lodash';


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

export const cardByCategorySelector = createSelector(
  getRelatedComplaintsByCategory,
  ({ cards }) => {
    return cards.map(cardTransform);
  }
);

export const cardByOfficerSelector = createSelector(
  getRelatedComplaintsByOfficer,
  ({ cards }) => {
    return cards.map(cardTransform);
  }
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
