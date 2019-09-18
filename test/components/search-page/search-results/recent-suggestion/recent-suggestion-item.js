import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RecentSuggestionItem from 'components/search-page/search-results/recent-suggestion/recent-suggestion-item';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';
import Row from 'components/common/row';


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

  it('should render recent CR suggestion with correct texts', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'CR', text: 'CRID', to: '/complaint/CRID/' } }/>
    );
    findRenderedComponentWithType(instance, Link);

    const row = findRenderedComponentWithType(instance, Row);

    row.props.label.should.equal('CR');
    row.props.content.should.equal('CRID');
  });

  it('should render recent TRR suggestion with correct texts', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'TRR', text: 'TRRID', to: '/trr/TRRID/' } }/>
    );
    findRenderedComponentWithType(instance, Link);

    const row = findRenderedComponentWithType(instance, Row);

    row.props.label.should.equal('TRR');
    row.props.content.should.equal('TRRID');
  });

  it('should render recent DATE > CR suggestion with correct texts', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'DATE > CR', text: 'CRID', to: '/complaint/CRID/' } }/>
    );
    findRenderedComponentWithType(instance, Link);

    const row = findRenderedComponentWithType(instance, Row);

    row.props.label.should.equal('Date > CR');
    row.props.content.should.equal('CRID');
  });

  it('should capitalize suggestion label', function () {
    instance = renderIntoDocument(
      <RecentSuggestionItem entry={ { contentType: 'OFFICER', text: 'Jame Brok', to: '/officer/123/' } }/>
    );
    findRenderedComponentWithType(instance, Link);

    const row = findRenderedComponentWithType(instance, Row);

    row.props.label.should.equal('Officer');
    row.props.content.should.equal('Jame Brok');
  });
});

