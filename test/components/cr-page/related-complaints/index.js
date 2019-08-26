import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import RelatedComplaints from 'components/cr-page/related-complaints';
import Dropdown from 'components/common/dropdown';


describe('RelatedComplaints component', function () {
  let instance;
  const store = MockStore()({
    crPage: {
      relatedComplaints: {
        relatedByCategory: {
          pagination: {},
          cards: {
            cards: [],
          },
        },
        relatedByOfficer: {
          pagination: {},
          cards: {
            cards: [],
          },
        },
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should set new distance when change dropdown value', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RelatedComplaints />
      </Provider>
    );

    instance = findRenderedComponentWithType(instance, RelatedComplaints);
    const dropdown = findRenderedComponentWithType(instance, Dropdown);
    dropdown.props.onChange('5 MILES');
    instance.state.selectedDistance.should.eql('5mi');
  });
});
