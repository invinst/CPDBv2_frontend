import React from 'react';
import { Provider } from 'react-redux';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import AggregateFacet from 'components/officer-page/summary-page/aggregate-facet';


describe('AggregateFacet component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      officerId: 1,
      timeline: {
        items: [{
          kind: 'CR',
          year: 2000,
          category: 'Illegal Search',
          date: '2004-08-30'
        }],
        minimap: {
          minimap: []
        }
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render the name and count of all entries', function () {

    const name = 'name';
    const entries = [{
      name: 'foo',
      count: 1,
      sustainedCount: 0,
      items: [{
        year: 2000,
        name: 'foo',
        count: 2,
        substained_count: 0 // eslint-disable-line camelcase
      }]
    }, {
      name: 'bar',
      count: 2,
      sustainedCount: 1,
      items: [{
        year: 2001,
        name: 'foo',
        count: 2,
        substained_count: 0 // eslint-disable-line camelcase
      }]
    }];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <AggregateFacet name={ name } entries={ entries }/>
      </Provider>
    );

    scryRenderedDOMComponentsWithClass(instance, 'test--aggregate-facet-name')[0].textContent.should.eql('NAME');

    scryRenderedDOMComponentsWithClass(instance, 'test--entry-count').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-sustained-count').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-name').should.have.length(2);

    scryRenderedDOMComponentsWithClass(instance, 'test--sparkline').should.have.length(2);

  });
});
