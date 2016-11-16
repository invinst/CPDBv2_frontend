import React from 'react';

import SuggestionResults from 'components/landing-page/autocomplete/suggestion-results';


describe('SuggestionResults component', function () {
  it('should be renderable', function () {
    const suggestionGroups = {
      a: [1]
    };
    SuggestionResults.should.be.renderable({ suggestionGroups });
  });
});
