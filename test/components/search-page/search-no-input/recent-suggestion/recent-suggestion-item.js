import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RecentSuggestionItem from 'components/search-page/search-no-input/recent-suggestion/recent-suggestion-item';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';


describe('RecentSuggestionItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a tag', function () {
    instance = renderIntoDocument(<RecentSuggestionItem entry={ recentSuggestionFactory.build() }/>);
    findRenderedDOMComponentWithTag(instance, 'a');
  });

  it('should render a link when given to props', function () {
    instance = renderIntoDocument(<RecentSuggestionItem entry={ recentSuggestionFactory.build({ to: '/abc/' }) }/>);
    findRenderedComponentWithType(instance, Link);
  });
});

