import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { random } from 'faker';
import sinon from 'sinon';
import should from 'should';

import PinboardAdminPage from 'components/pinboard-admin-page';
import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';


describe('PinboardAdminPage', function () {
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
    const fetchPinboards = sinon.spy();
    const fetchPinboardStaticSocialGraph = sinon.spy();
    const cachedDataIDs = ['aaaa1111', 'bbbb2222'];

    const wrapper = shallow(
      <PinboardAdminPage
        pinboards={ pinboards }
        hasMore={ hasMore }
        nextParams={ nextParams }
        fetchPinboards={ fetchPinboards }
        fetchPinboardStaticSocialGraph={ fetchPinboardStaticSocialGraph }
        isLoading={ true }
        cachedDataIDs={ cachedDataIDs }
      />
    );
    const instance = wrapper.instance();

    const header = wrapper.find(ShareableHeaderContainer);
    should(header.prop('buttonType')).be.undefined();

    const table = wrapper.find(PinboardsTable);
    table.prop('rows').should.eql(pinboards);
    table.prop('hasMore').should.equal(hasMore);
    table.prop('nextParams').should.eql(nextParams);
    table.prop('fetchPinboards').should.eql(fetchPinboards);
    table.prop('isLoading').should.be.true();
    table.prop('focusItem').should.eql(instance.focusItem);

    let previewPane = wrapper.find(PreviewPaneWithOverlay);
    previewPane.prop('isShown').should.be.false();
    previewPane.prop('handleClose').should.eql(instance.handleOverlayClick);
    previewPane.prop('customClass').should.equal('preview-pane');
    previewPane.prop('yScrollable').should.be.true();
    previewPane.prop('dynamicHeight').should.be.true();
    previewPane.prop('fetchPinboardStaticSocialGraph').should.eql(fetchPinboardStaticSocialGraph);
    previewPane.prop('cachedDataIDs').should.eql(cachedDataIDs);
    previewPane.prop('type').should.equal('PINBOARD');
    previewPane.prop('data').should.be.empty();

    instance.focusItem({ id: 123 });
    wrapper.update();
    previewPane = wrapper.find(PreviewPaneWithOverlay);
    previewPane.prop('isShown').should.be.true();
    previewPane.prop('data').should.eql({ id: 123 });

    instance.handleOverlayClick();
    wrapper.update();
    previewPane = wrapper.find(PreviewPaneWithOverlay);
    previewPane.prop('isShown').should.be.false();
    previewPane.prop('data').should.eql({ id: 123 });
  });

  it('should call clearPinboardStaticSocialGraphCache when componentWillUnmount', function () {
    const pinboardAdminStore = MockStore()({
      pinboardAdminPage: {
        graphData: {
          cachedData: {},
          requesting: false,
        },
      },
      breadcrumb: {
        breadcrumbItems: [],
      },
    });

    const spyClearPinboardStaticSocialGraphCache = sinon.spy();

    const wrapper = mount(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage clearPinboardStaticSocialGraphCache={ spyClearPinboardStaticSocialGraphCache }/>
      </Provider>
    );

    wrapper.unmount();

    spyClearPinboardStaticSocialGraphCache.should.be.calledOnce();
  });
});
