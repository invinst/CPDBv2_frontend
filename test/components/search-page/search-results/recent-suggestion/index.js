import React from 'react';
import { Link } from 'react-router';

import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  renderIntoDocument
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RecentSuggestionItem from 'components/search-page/search-results/recent-suggestion/recent-suggestion-item';
import Row from 'components/common/row';


describe('RecentSuggestion component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Row with label', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'something' } }/>
    );

    let row = findRenderedComponentWithType(instance, Row);
    row.props.label.should.eql('Something');
  });

  it('should render Link when there is entry.to', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'something', to: '/some/path' } }/>
    );

    let link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/some/path');
  });

  it('should render a tag when there is no entry.to', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem
        entry={ { contentType: 'something', url: 'http://localhost/some/url' } }
      />
    );

    let link = findRenderedDOMComponentWithTag(instance, 'a');
    link.href.should.eql('http://localhost/some/url');
  });
});
