import React from 'react';

import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { fill } from 'lodash';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionGroup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SuggestionGroup.should.be.renderable({ suggestions: [[]] });
  });

  it('should render null', function () {
    instance = renderIntoDocument(<SuggestionGroup/>);
    (findDOMNode(instance) === null).should.be.true();
  });

  it('should not render `Show more results` if canLoadMore is false', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        suggestions={ [fill(new Array(10), {})] }
        canLoadMore={ false } />
    );
    findDOMNode(instance).textContent.should.not.containEql('Show more results');
  });

  it('should render `Show more results` if canLoadMore is true', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        suggestions={ [fill(new Array(10), {})] }
        canLoadMore={ true } />
    );
    findDOMNode(instance).textContent.should.containEql('Show more results');
  });
});
