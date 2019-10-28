import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { random } from 'faker';
import { spy } from 'sinon';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardAdminPage from 'components/pinboard-admin-page';
import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';


describe('PinboardAdminPage', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ShareableHeader and PinboardsTable', function () {
    const pinboards = [{ id: 1, kind: PINBOARDS_SEARCH_ITEMS.PINBOARD, officerIds: [123] }];
    const hasMore = random.boolean();
    const nextParams = { offset: 20, limit: 30 };
    const fetchPinboards = spy();
    const store = MockStore()({
      breadcrumb: {
        breadcrumbs: [],
      },
    });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardAdminPage
          pinboards={ pinboards }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchPinboards={ fetchPinboards }
        />
      </Provider>
    );

    const header = findRenderedComponentWithType(instance, ShareableHeaderContainer);
    should(header.props.buttonType).be.undefined();

    const table = findRenderedComponentWithType(instance, PinboardsTable);
    table.props.rows.should.eql(pinboards);
    table.props.hasMore.should.equal(hasMore);
    table.props.nextParams.should.eql(nextParams);
    table.props.fetchPinboards.should.eql(fetchPinboards);
  });
});
