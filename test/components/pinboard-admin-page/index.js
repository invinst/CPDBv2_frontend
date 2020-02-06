import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { random } from 'faker';
import { spy } from 'sinon';
import should from 'should';
import { browserHistory } from 'react-router';

import PinboardAdminPage from 'components/pinboard-admin-page';
import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import SearchBar from 'components/common/search-bar';


describe('PinboardAdminPage', function () {
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

    const wrapper = shallow(
      <PinboardAdminPage
        pinboards={ pinboards }
        hasMore={ hasMore }
        nextParams={ nextParams }
        fetchPinboards={ fetchPinboards }
        fetchPinboardStaticSocialGraph={ fetchPinboardStaticSocialGraph }
        isLoading={ true }
        cachedDataIDs={ cachedDataIDs }
        location={ { pathname: '/view-all-pinboards/' } }
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
    previewPane = wrapper.find(PreviewPaneWithOverlay);
    previewPane.prop('isShown').should.be.true();
    previewPane.prop('data').should.eql({ id: 123 });

    instance.handleOverlayClick();
    previewPane = wrapper.find(PreviewPaneWithOverlay);
    previewPane.prop('isShown').should.be.false();
    previewPane.prop('data').should.eql({ id: 123 });
  });

  it('should call clearPinboardStaticSocialGraphCache when componentWillUnmount', function () {
    const spyClearPinboardStaticSocialGraphCache = spy();

    const wrapper = mount(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage
          clearPinboardStaticSocialGraphCache={ spyClearPinboardStaticSocialGraphCache }
          location={ { pathname: '/view-all-pinboards/' } }
        />
      </Provider>
    );

    wrapper.unmount();

    spyClearPinboardStaticSocialGraphCache.should.be.calledOnce();
  });

  it('should render SearchBar component', function () {
    const wrapper = mount(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage location={ { pathname: '/view-all-pinboards/' } } />
      </Provider>
    );

    wrapper.find(SearchBar).exists().should.be.true();
  });

  it('should change url if search text is changed', function () {
    spy(browserHistory, 'push');
    const wrapper = mount(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage location={ { pathname: '/view-all-pinboards/' } }/>
      </Provider>
    );

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'term' } } );

    browserHistory.push.should.be.calledWith('/view-all-pinboards/?match=term');
    browserHistory.push.restore();
  });

  it('should not change url if search text hasnt changed', function () {
    const wrapper = mount(
      <Provider store={ pinboardAdminStore }>
        <PinboardAdminPage location={ { pathname: '/view-all-pinboards/' } }/>
      </Provider>
    );
    spy(browserHistory, 'push');

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'abc' } } );
    browserHistory.push.should.be.calledOnce();
    browserHistory.push.resetHistory();

    inputElement.simulate('change', { target: { value: 'abc' } } );

    browserHistory.push.should.be.not.called();
    browserHistory.push.restore();
  });
});
