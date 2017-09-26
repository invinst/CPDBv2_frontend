import React from 'react';
import { Provider } from 'react-redux';
import { renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { unmountComponentSuppressError } from 'utils/test';

import AggregateRow from 'components/officer-page/summary-page/aggregate-row';
import SimpleSparklines from 'components/common/sparklines';

describe('AggregateRow component', function () {
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

  it('should render name, count, substained count, and sparklines', function () {

    const entries = {
      name: 'foo',
      count: 3,
      sustainedCount: 1,
      items: [{
        year: 2001,
        name: 'foo',
        count: 2,
        substained_count: 0   // eslint-disable-line camelcase
      }, {
        year: 2002,
        name: 'foo',
        count: 3,
        substained_count: 1   // eslint-disable-line camelcase
      }]
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <AggregateRow name={ entries.name } count={ entries.count }
          sustainedCount={ entries.sustainedCount } items={ entries.items } />
      </Provider>
    );

    scryRenderedDOMComponentsWithClass(instance, 'test--entry-name')[0].textContent.should.eql('foo');
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-count')[0].textContent.should.eql('3');
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-sustained-count')[0].textContent.should.eql('1');

    scryRenderedComponentsWithType(instance, SimpleSparklines).length.should.eql(1);

  });
});
