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

import { reRender, unmountComponentSuppressError } from 'utils/test';
import PinboardAdminPage from 'components/pinboard-admin-page';
import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import PinboardPageContainer from 'containers/pinboard-page';
import { createMemoryHistory, Route, Router } from 'react-router';


describe('PinboardAdminPage', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const pinboards = [
      {
        id: 'abcd1234',
        kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
        officerIds: [123],
      },
    ];
    const hasMore = random.boolean();
    const nextParams = { offset: 20, limit: 30 };
    const fetchPinboards = spy();
    const fetchPinboardStaticSocialGraph = spy();
    const cachedDataIDs = ['aaaa1111', 'bbbb2222'];
    const store = MockStore()({
      pinboardAdminPage: {
        graphData: {
          cachedData: {},
          requesting: false,
        },
      },
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
          fetchPinboardStaticSocialGraph={ fetchPinboardStaticSocialGraph }
          isLoading={ true }
          cachedDataIDs={ cachedDataIDs }
        />
      </Provider>
    );

    const pinboardAdminPage = findRenderedComponentWithType(instance, PinboardAdminPage);

    const header = findRenderedComponentWithType(instance, ShareableHeaderContainer);
    should(header.props.buttonType).be.undefined();

    const table = findRenderedComponentWithType(instance, PinboardsTable);
    table.props.rows.should.eql(pinboards);
    table.props.hasMore.should.equal(hasMore);
    table.props.nextParams.should.eql(nextParams);
    table.props.fetchPinboards.should.eql(fetchPinboards);
    table.props.isLoading.should.be.true();
    table.props.focusItem.should.eql(pinboardAdminPage.focusItem);

    const previewPane = findRenderedComponentWithType(instance, PreviewPaneWithOverlay);
    previewPane.props.isShown.should.be.false();
    previewPane.props.handleClose.should.eql(pinboardAdminPage.handleOverlayClick);
    previewPane.props.customClass.should.equal('preview-pane');
    previewPane.props.yScrollable.should.be.true();
    previewPane.props.dynamicHeight.should.be.true();
    previewPane.props.fetchPinboardStaticSocialGraph.should.eql(fetchPinboardStaticSocialGraph);
    previewPane.props.cachedDataIDs.should.eql(cachedDataIDs);
    previewPane.props.type.should.equal('PINBOARD');
    previewPane.props.data.should.be.empty();

    pinboardAdminPage.focusItem({ id: 123 });
    previewPane.props.isShown.should.be.true();
    previewPane.props.data.should.eql({ id: 123 });

    pinboardAdminPage.handleOverlayClick();
    previewPane.props.isShown.should.be.false();
    previewPane.props.data.should.eql({ id: 123 });
  });

  it('should call clearPinboardStaticSocialGraphCache when componentWillUnmount', function () {
    const defaultPaginationState = {
      requesting: false,
      items: [],
      count: 0,
      pagination: { next: null, previous: null },
    };

    const pinboardAdminStore = MockStore()({
      pinboardAdminPage: {
        graphData: {
          cachedData: {},
          requesting: false,
        },
      },
      breadcrumb: {
        breadcrumbs: [],
      },
    });

    const pinboardStore = MockStore()({
      breadcrumb: {
        breadcrumbs: [],
      },
      pinboardPage: {
        graphData: { requesting: false, cachedData: {} },
        geographicData: { requesting: false, data: [] },
        currentTab: 'NETWORK',
        relevantDocuments: defaultPaginationState,
        relevantCoaccusals: defaultPaginationState,
        relevantComplaints: defaultPaginationState,
        crItems: { requesting: false, items: [] },
        officerItems: { requesting: false, items: [] },
        trrItems: { requesting: false, items: [] },
        redirect: false,
        initialRequested: true,
        focusedItem: {},
        pinboard: {
          'id': '5cd06f2b',
          'title': 'Pinboard title',
        },
        editModeOn: false,
        pinboards: [],
      },
      pathname: 'pinboard/5cd06f2b',
    });

    const spyClearPinboardStaticSocialGraphCache = spy();

    instance = renderIntoDocument(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage clearPinboardStaticSocialGraphCache={ spyClearPinboardStaticSocialGraphCache }/>
      </Provider>
    );

    const pinboardPage = () => (
      <Provider store={ pinboardStore }>
        <PinboardPageContainer />
      </Provider>
    );

    reRender(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>,
      instance
    );

    spyClearPinboardStaticSocialGraphCache.should.be.calledOnce();
  });
});