import React from 'react';
import { shallow } from 'enzyme';
import BreadcrumbContainer from 'containers/breadcrumb';
import { stub } from 'sinon';
import * as domUtils from 'utils/dom';

import ShareableHeader from 'components/headers/shareable-header';
import { updateShareablePageScrollPosition } from 'actions/headers/shareable-header';


describe('ShareableHeader component', function () {
  let wrapper, shareableHeader;

  beforeEach (function () {
    wrapper = shallow(
      <ShareableHeader
        headerButtons={ <div className='custom-buttons' /> }
        updateShareablePageScrollPosition={ updateShareablePageScrollPosition }
      />
    );
    shareableHeader = wrapper;
  });

  it('should render BreadcrumbContainer, header buttons and other contents', function () {
    wrapper.find(BreadcrumbContainer).should.have.length(1);

    wrapper.find('.shareable-header-header-placeholder').exists().should.be.true();
    wrapper.find('.shareable-header-nav-bar').exists().should.be.true();
    wrapper.find('.custom-buttons').exists().should.be.true();
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

