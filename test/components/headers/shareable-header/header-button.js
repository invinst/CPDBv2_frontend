import React from 'react';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';

import HeaderButton from 'components/headers/shareable-header/header-button';


const Menu = (props) => (
  <div className='menu'>Menu</div>
);

describe('HeaderButton component', function () {
  describe('components render', function () {
    let wrapper;
    beforeEach(function () {
      this.stubOnOpen = stub();
      this.stubOnClose = stub();
      wrapper = mount(
        <HeaderButton
          name='button'
          Menu={ Menu }
          menuProps={ { name: 'menu name' } }
          buttonClassName='button'
          onOpen={ this.stubOnOpen }
          onClose={ this.stubOnClose }
        />
      );
    });

    it('should render contents', function () {
      const instance = wrapper.instance();
      const button = wrapper.find('.button');
      button.prop('onClick').should.equal(instance.openMenu);
    });

    it('should close "share" menu by default', function () {
      wrapper.state('menuIsOpen').should.be.false();
      wrapper.find(Menu).exists().should.be.false();
    });

    it('should toggle menu when being clicked', function () {
      wrapper.find(Menu).exists().should.be.false();
      wrapper.find('.button').simulate('click');
      wrapper.find(Menu).exists().should.be.true();
      wrapper.find('.button').simulate('click', { stopPropagation: () => {} });
      wrapper.find(Menu).exists().should.be.false();
    });

    it('should call onOpen/onClose when opening/closing', function () {
      wrapper.find('.button').simulate('click');
      this.stubOnOpen.should.be.calledOnce();
      wrapper.find('.button').simulate('click', { stopPropagation: () => {} });
      this.stubOnClose.should.be.calledOnce();
    });

    it('should add focus class name when menuIsOpen', function () {
      wrapper.find('.button').simulate('click');

      const shareButtonDOMElement = wrapper.find('.button');
      shareButtonDOMElement.hasClass('focus').should.be.true();
    });

    it('Should render custom menu', function () {
      wrapper.find('.button').simulate('click');

      const menu = wrapper.find(Menu);
      menu.exists().should.be.true();
      menu.prop('name').should.eql('menu name');
    });
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');
    const wrapper = mount(
      <HeaderButton name='button' buttonClassName='button' Menu={ Menu }/>
    );

    window.addEventListener.should.be.calledWith('mousedown', wrapper.instance().handleClickOutside);
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');
    const wrapper = mount(
      <HeaderButton name='button' buttonClassName='button' Menu={ Menu }/>
    );
    const handleClickOutside = wrapper.instance().handleClickOutside;
    wrapper.unmount();
    window.removeEventListener.should.be.calledWith('mousedown', handleClickOutside);
  });

  it('should call closeMenu when clicking outside menu', function () {
    const wrapper = mount(
      <div>
        <HeaderButton name='button' buttonClassName='button' Menu={ Menu }/>
        <div className='outside' />
      </div>
    );

    const outsideComponent = wrapper.find('.outside');
    const headerButton = wrapper.find(HeaderButton).instance();
    const closeMenuSpy = spy(headerButton, 'closeMenu');
    headerButton.handleClickOutside({ target: outsideComponent.getDOMNode() });
    closeMenuSpy.should.be.called();
  });

  it('should not call closeMenu when clicking menu button', function () {
    const wrapper = mount(
      <HeaderButton name='button' buttonClassName='button' Menu={ Menu }/>
    );

    const menuButton = wrapper.find('.button');
    const headerButton = wrapper.find(HeaderButton).instance();
    const closeMenuSpy = spy(headerButton, 'closeMenu');
    headerButton.handleClickOutside({ target: menuButton.getDOMNode() });
    closeMenuSpy.should.not.be.called();
  });

  it('should not call closeMenu when clicking menu', function () {
    const wrapper = mount(
      <HeaderButton name='button' buttonClassName='button' Menu={ Menu }/>
    );

    wrapper.find('.button').simulate('click');
    const menu = wrapper.find('.menu');
    const headerButton = wrapper.find(HeaderButton).instance();
    const closeMenuSpy = spy(headerButton, 'closeMenu');
    headerButton.handleClickOutside({ target: menu.getDOMNode() });
    closeMenuSpy.should.not.be.called();
  });
});
