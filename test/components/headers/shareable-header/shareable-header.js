import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import BreadcrumbContainer from 'containers/breadcrumb';
import { stub } from 'sinon';
import * as domUtils from 'utils/dom';
import { MemoryRouter } from 'react-router-dom';

import ShareableHeader from 'components/headers/shareable-header';
import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import * as constants from 'utils/constants';
import { SHAREABLE_HEADER_BUTTON_TYPE } from 'utils/constants';
import { updateShareablePageScrollPosition } from 'actions/headers/shareable-header';


describe('ShareableHeader component', function () {
  function CustomMenu(props) {
    return <div/>;
  }

  let wrapper, shareableHeader;

  beforeEach (function () {
    this.stubOnOpen = stub();
    this.stubOnClose = stub();
    wrapper = shallow(
      <ShareableHeader
        buttonType={ SHAREABLE_HEADER_BUTTON_TYPE.MENU }
        Menu={ CustomMenu }
        onOpen={ this.stubOnOpen }
        onClose={ this.stubOnClose }
        updateShareablePageScrollPosition={ updateShareablePageScrollPosition }
      />
    );
    shareableHeader = wrapper;
  });

  it('should render HeaderButton, BreadcrumbContainer and other contents', function () {
    const headerButton = wrapper.find(HeaderButton);
    headerButton.prop('Menu').should.eql(CustomMenu);
    headerButton.prop('onOpen').should.eql(this.stubOnOpen);
    headerButton.prop('onClose').should.eql(this.stubOnClose);

    wrapper.find(BreadcrumbContainer).should.have.length(1);

    wrapper.find('.shareable-header-header-placeholder').exists().should.be.true();
    wrapper.find('.shareable-header-nav-bar').exists().should.be.true();
  });

  describe('handleScroll', function () {
    beforeEach(function () {
      stub(domUtils, 'calculatePosition');
    });

    it('should remain in top position', function () {
      domUtils.calculatePosition.returns('top');
      shareableHeader.instance().handleScroll();
      shareableHeader.state('position').should.equal('top');
    });

    it('should transition to middle position', function () {
      domUtils.calculatePosition.returns('middle');
      shareableHeader.instance().handleScroll();
      shareableHeader.state('position').should.equal('middle');
    });

    it('should transition to bottom position', function () {
      domUtils.calculatePosition.returns('bottom');
      shareableHeader.instance().handleScroll();
      shareableHeader.state('position').should.equal('bottom');
    });
  });
});

describe('ShareableHeader component with button components', function () {
  it('should render LinkHeaderButton component if buttonType is LINK', function () {
    const wrapper = shallow(
      <ShareableHeader buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK }/>
    );
    wrapper.find(LinkHeaderButton).exists().should.be.true();
  });

  it('should render HeaderButton component if buttonType is MENU', function () {
    const wrapper = shallow(
      <ShareableHeader buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU }/>
    );
    wrapper.find(HeaderButton).exists().should.be.true();
  });

  it('should not render button if buttonType is NONE', function () {
    const wrapper = shallow(
      <ShareableHeader buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE }/>
    );

    wrapper.find(LinkHeaderButton).exists().should.be.false();
    wrapper.find(HeaderButton).exists().should.be.false();
  });

  it('should render custom buttons', function () {
    const wrapper = shallow(<ShareableHeader customButtons={ <div className='custom-buttons' /> } />);

    wrapper.find('.custom-buttons').exists().should.be.true();
  });
});

describe('ShareableHeader global click listener', function () {
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbItems: [],
    },
  });

  let wrapper, shareableHeader;

  beforeEach(function () {
    stub(document.body, 'addEventListener');
    stub(document.body, 'removeEventListener');
    wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <ShareableHeaderContainer />
        </MemoryRouter>
      </Provider>
    );
    shareableHeader = wrapper.find(ShareableHeader);
  });

  it('should assign global click handler to close share menu', function () {
    document.body.addEventListener.should.be.calledWith('click', shareableHeader.closeShareMenu);
  });

  it('should destroy global click handler on unmount', function () {
    document.body.removeEventListener.called.should.be.false();
    wrapper.unmount();
    document.body.removeEventListener.should.be.calledWith('click', shareableHeader.closeShareMenu);
  });
});

describe('ShareableHeader global scroll listener', function () {
  let wrapper;

  beforeEach(function () {
    stub(window, 'addEventListener');
    stub(window, 'removeEventListener');
    wrapper = shallow(<ShareableHeader />);
  });

  it('should assign global scroll handler to close share menu', function () {
    wrapper.instance().componentDidMount();
    window.addEventListener.should.be.calledWith('scroll', wrapper.instance().handleScroll);
  });

  it('should destroy global click handler on unmount', function () {
    window.removeEventListener.called.should.be.false();
    wrapper.instance().componentWillUnmount();
    window.removeEventListener.should.be.calledWith('scroll', wrapper.instance().handleScroll);
  });
});

