import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument } from 'react-addons-test-utils';

import SuggestionResults from 'components/landing-page/autocomplete/suggestion-results';
import SuggestionNoResult from 'components/landing-page/autocomplete/suggestion-results/suggestion-no-result';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionResults component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const suggestionGroups = {
      a: [1]
    };
    SuggestionResults.should.be.renderable({ suggestionGroups });
  });

  it('should render SuggestionNoResult component when isEmpty', function () {
    instance = renderIntoDocument(
      <SuggestionResults isEmpty={ true }/>
    );

    findRenderedComponentWithType(instance, SuggestionNoResult).should.be.ok();
  });
});
