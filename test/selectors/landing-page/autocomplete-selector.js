import { tagsSelector } from 'selectors/landing-page/autocomplete-selector';


describe('tagsSelector', function () {
  it('should extract group keys', function () {
    tagsSelector({
      landingPage: {
        suggestionApp: {
          suggestionGroups: { a: [], b: [1, 2, 3] }
        }
      }
    }).should.deepEqual(['b']);
  });
});
