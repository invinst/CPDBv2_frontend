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
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';


describe('PinboardAdminPage', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const pinboards = [{ id: 1, kind: PINBOARDS_SEARCH_ITEMS.PINBOARD, officerIds: [123] }];
    const hasMore = random.boolean();
    const nextParams = { offset: 20, limit: 30 };
    const fetchPinboards = spy();
    const fetchPinboardSocialGraph = spy();
    const cachedDataIDs = ['aaaa1111', 'bbbb2222'];
    const store = MockStore()({
      pinboardPage: {
        graphData: { cachedData: {} },
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
          fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
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
    previewPane.props.fetchPinboardSocialGraph.should.eql(fetchPinboardSocialGraph);
    previewPane.props.cachedDataIDs.should.eql(cachedDataIDs);
    previewPane.props.type.should.equal('PINBOARD');
    previewPane.props.data.should.be.empty();

    pinboardAdminPage.focusItem({ id: 123 });
    previewPane.props.isShown.should.be.true();
    previewPane.props.data.should.eql({ id: 123 });

    pinboardAdminPage.handleOverlayClick();
    previewPane.props.isShown.should.be.false();
    previewPane.props.data.should.be.empty();
  });

  describe('componentDidMount', function () {
    const store = MockStore()({
      pinboardPage: {
        graphData: { cachedData: {} },
      },
      breadcrumb: {
        breadcrumbs: [],
      },
    });

    it('should openLoginModal if not logged in', function () {
      const spyOpenLoginModal = spy();

      instance = renderIntoDocument(
        <Provider store={ store }>
          <PinboardAdminPage
            openLoginModal={ spyOpenLoginModal }
            isSignedIn={ false }
          />
        </Provider>
      );

      spyOpenLoginModal.should.be.calledOnce();
    });

    it('should not openLoginModal if already logged in', function () {
      const spyOpenLoginModal = spy();

      instance = renderIntoDocument(
        <Provider store={ store }>
          <PinboardAdminPage
            openLoginModal={ spyOpenLoginModal }
            isSignedIn={ true }
          />
        </Provider>
      );

      spyOpenLoginModal.should.not.be.called();
    });
  });
});
