import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareMenu from 'components/headers/shareable-header/share-menu';


describe('HeaderButton component', function () {
  let wrapper;
  beforeEach(function () {
    this.stubOnOpen = stub();
    this.stubOnClose = stub();
    wrapper = shallow(
      <HeaderButton
        scrollPosition='top'
        buttonText='Header button'
        onOpen={ this.stubOnOpen }
        onClose={ this.stubOnClose }
      />
    );
  });

  it('should be render contents', function () {
    const shareButtonDOMElement = wrapper.find('.button');
    shareButtonDOMElement.text().should.equal('Header button');
    shareButtonDOMElement.hasClass('top').should.be.true();
    wrapper.find(ShareMenu).exists().should.be.false();
  });

  it('should close "share" menu by default', function () {
    wrapper.state('shareMenuIsOpen').should.be.false();
    wrapper.find(ShareMenu).exists().should.be.false();
  });

  it('should toggle menu when being clicked', function () {
    wrapper.find(ShareMenu).exists().should.be.false();
    wrapper.find('.button').simulate('click');
    wrapper.find(ShareMenu).exists().should.be.true();
    wrapper.find('.button').simulate('click', { stopPropagation: () => {} });
    wrapper.find(ShareMenu).exists().should.be.false();
  });

  it('should call onOpen/onClose when opening/closing', function () {
    wrapper.find('.button').simulate('click');
    this.stubOnOpen.should.be.calledOnce();
    wrapper.find('.button').simulate('click', { stopPropagation: () => {} });
    this.stubOnClose.should.be.calledOnce();
  });

  it('should add focus class name when shareMenuIsOpen', function () {
    wrapper.find('.button').simulate('click');

    const shareButtonDOMElement = wrapper.find('.button');
    shareButtonDOMElement.hasClass('focus').should.be.true();
    shareButtonDOMElement.hasClass('top').should.be.false();
  });

  it('Should render custom menu', function () {
    function CustomMenu(props) {
      return <div/>;
    }

    const wrapper = shallow(
      <HeaderButton scrollPosition='top' buttonText='Header button' Menu={ CustomMenu }/>
    );

    wrapper.find('.button').simulate('click');

    wrapper.find(CustomMenu).exists().should.be.true();
  });
});
