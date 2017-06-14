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
    SuggestionGroup.should.be.renderable({ suggestions: [{}] });
  });

  it('should render null', function () {
    instance = renderIntoDocument(<SuggestionGroup/>);
    (findDOMNode(instance) === null).should.be.true();
  });

  it('should not show `Show more results` if currently showing a single content type\'s results', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        onLoadMore={ () => {} }
        suggestions={ fill(new Array(10), {}) }
        isShowingSingleContentType={ true } />
    );
    findDOMNode(instance).textContent.should.not.containEql('Show more results');
  });
  it('should not show `Show more results` if showing less than 10 results', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        onLoadMore={ () => {} }
        suggestions={ fill(new Array(9), {}) }
        isShowingSingleContentType={ false } />
    );
    findDOMNode(instance).textContent.should.not.containEql('Show more results');
  });

  it('should show `Show more results` if it had 10 suggestions', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        onLoadMore={ () => {} }
        suggestions={ fill(new Array(10), {}) }
        isShowingSingleContentType={ false } />
    );
    findDOMNode(instance).textContent.should.containEql('Show more results');
  });
});
