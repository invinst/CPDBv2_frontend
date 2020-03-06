import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub } from 'sinon';

import HeaderButton from 'components/headers/shareable-header/header-button';


const Menu = (props) => (
  <div>Menu</div>
);

describe('HeaderButton component', function () {
  let wrapper;
  beforeEach(function () {
    this.stubOnOpen = stub();
    this.stubOnClose = stub();
    wrapper = mount(
      <HeaderButton
        Menu={ Menu }
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
    const wrapper = shallow(
      <HeaderButton buttonClassName='button' Menu={ Menu }/>
    );

    wrapper.find('.button').simulate('click');

    wrapper.find(Menu).exists().should.be.true();
  });
});
