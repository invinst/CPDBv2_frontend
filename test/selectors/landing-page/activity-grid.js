import lodash from 'lodash';
import { spy } from 'sinon';

import { pairingCardTransform } from 'selectors/landing-page/common';
import { cardsSelector, hasCards } from 'selectors/landing-page/activity-grid';
import { RawOfficerCardFactory, RawOfficersPairCardFactory } from 'utils/test/factories/activity-grid.js';


describe('activity-grid selectors', function () {
  const state = (cards, pinboard = {}) => ({
    landingPage: {
      activityGrid: { cards },
    },
    pinboardPage: { pinboard },
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      cardsSelector(state(RawOfficerCardFactory.buildList(40))).should.have.length(40);
    });

    it('should transform correctly', function () {
      const rawCards = [{
        id: 1,
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'percentile_allegation': '80.0000',
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        kind: 'single_officer',
      }, {
        id: 9,
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'percentile_allegation': '80.0000',
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        kind: 'single_officer',
      }];
      const expectation = {
        1: {
          id: 1,
          officerId: 1,
          fullName: 'someone',
          complaintCount: 10,
          sustainedCount: 5,
          allegationPercentile: 80,
          age: '47-year-old',
          race: 'black',
          rank: 'Police Officer',
          gender: 'female',
          percentile: {
            items: [
              { axis: 'Use of Force Reports', value: NaN },
              { axis: 'Officer Allegations', value: NaN },
              { axis: 'Civilian Allegations', value: NaN },
            ],
            visualTokenBackground: '#FF412C',
            textColor: '#231F20',
          },
          kind: 'single_officer',
          isPinned: true,
        },
        9: {
          id: 9,
          officerId: 9,
          fullName: 'someone',
          complaintCount: 10,
          sustainedCount: 5,
          allegationPercentile: 80,
          age: '47-year-old',
          race: 'black',
          rank: 'Police Officer',
          gender: 'female',
          percentile: {
            items: [
              { axis: 'Use of Force Reports', value: NaN },
              { axis: 'Officer Allegations', value: NaN },
              { axis: 'Civilian Allegations', value: NaN },
            ],
            visualTokenBackground: '#FF412C',
            textColor: '#231F20',
          },
          kind: 'single_officer',
          isPinned: false,
        },
      };

      const cards = cardsSelector(state(rawCards, { 'officer_ids': ['1', '2', '3'] }));
      cards.should.have.length(2);
      cards.forEach(card => card.should.eql(expectation[card.id]));
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');

      cardsSelector(state(lodash.range(40)));

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();
    });

    it('should return pairing card in the 1st position', function () {
      const pairCards = RawOfficersPairCardFactory.buildList(2);
      const singleCards = RawOfficerCardFactory.buildList(2);
      const cards = cardsSelector(state([...singleCards, ...pairCards]));
      const transformedPairCards = lodash.map(pairCards, (pairingCard) => {
        const transformedCard = pairingCardTransform(pairingCard);
        transformedCard.officer1['isPinned'] = false;
        transformedCard.officer2['isPinned'] = false;
        return transformedCard;
      });
      lodash.some(transformedPairCards, cards[0]).should.be.true();
    });
  });

  describe('hasCards', function () {
    it('should return true if activityGrid has data', function () {
      hasCards(state(['abc'])).should.be.true();
    });

    it('should return false if activityGrid does not have data', function () {
      hasCards(state([])).should.be.false();
    });
  });
});
