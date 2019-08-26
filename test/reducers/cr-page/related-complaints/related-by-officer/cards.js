import cards from 'reducers/cr-page/related-complaints/related-by-officer/cards';

describe('related complaints by officer cards reducer', function () {
  it('should return initial state', function () {
    cards(undefined, {}).should.eql({
      meta: {
        crPageCrid: null,
        distance: null,
      },
      cards: [],
    });
  });

  describe('should handle RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS', function () {
    it('should return cards results', function () {
      const action = {
        type: 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS',
        payload: {
          results: ['a'],
        },
        request: {
          url: '/cr/123/related-complaints/?distance=10mi',
        },
      };

      cards({ meta: {} }, action).should.eql({
        meta: {
          crPageCrid: '123',
          distance: '10mi',
        },
        cards: ['a'],
      });
    });

    it('should append cards results if meta exists', function () {
      const action = {
        type: 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS',
        payload: {
          results: [{ crid: 'b' }],
        },
        request: {
          url: '/cr/123/related-complaints/?distance=10mi',
        },
      };

      cards({
        meta: {
          crPageCrid: '123',
          distance: '10mi',
        },
        cards: [{ crid: 'a' }],
      }, action).cards.should.eql([{ crid: 'a' }, { crid: 'b' }]);
    });
  });
});
