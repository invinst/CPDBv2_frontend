import { suggestionsSelector } from 'selectors/landing-page/autocomplete-selector';


describe('suggestionsSelector', function () {
  it('should group suggestions by type', function () {
    suggestionsSelector({
      landingPage: {
        suggestionApp: {
          suggestions: [{
            text: 'a',
            payload: {
              type: 'a'
            }
          }, {
            text: 'aa',
            payload: {
              type: 'a'
            }
          }, {
            text: 'b',
            payload: {
              type: 'b'
            }
          }]
        }
      }
    }).should.deepEqual({
      a: [{
        text: 'a',
        payload: {
          type: 'a'
        }
      }, {
        text: 'aa',
        payload: {
          type: 'a'
        }
      }],
      b: [{
        text: 'b',
        payload: {
          type: 'b'
        }
      }]
    });
  });
});
