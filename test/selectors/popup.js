import { popupSelector } from 'selectors/popup';

describe('popup selector', function () {
  describe('popupSelector', function () {
    it('should return popups', function () {
      const state = {
        popups: [{
          name: 'unit',
          page: 'officer',
          title: 'Unit',
          text: 'Some unit explanation',
        }, {
          name: 'rank',
          page: 'officer',
          title: 'Rank',
          text: 'Some rank explanation',
        }],
      };
      popupSelector(state).should.eql({
        'unit': {
          title: 'Unit',
          text: 'Some unit explanation',
        },
        'rank': {
          title: 'Rank',
          text: 'Some rank explanation',
        },
      });
    });
  });
});
