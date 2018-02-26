import { createSelector } from 'reselect';
import { shuffle } from 'lodash';


export const getCarouselDocumentHeaderEditModeOn = state => state.landingPage.recentDocument.headerEditModeOn;
const getCards = state => state.landingPage.recentDocument.cards;

const cardTransform = (card) => ({
  crid: card['crid'],
  latestDocument: card.hasOwnProperty('latest_document') ? {
    title: card['latest_document']['title'],
    url: card['latest_document']['url'],
    previewImageUrl: card['latest_document']['preview_image_url']
  } : {},
  numDocuments: card['num_recent_documents']
});

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);
