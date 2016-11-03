import React from 'react';

import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { fill } from 'lodash';
import SuggestionGroup from 'components/landing-page/autocomplete/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionGroup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should be renderable', function () {
    SuggestionGroup.should.be.renderable();
  });

  it('should show `Show more results` if it had 10 suggestions', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        suggestions={ fill(new Array(9), 1) } />
    );
    findDOMNode(instance).textContent.should.containEql('Show more results');
  });
});
