import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Dropdown from 'components/common/dropdown';
import styles from 'components/common/dropdown/menu.sass';


describe('Dropdown component', function () {
  it('should have correct default state', function () {
    const wrapper = shallow(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    wrapper.state().should.eql({
      open: false,
      selectedIndex: 0,
    });
  });

  it('should render menu items with options that are not selected', function () {
    const wrapper = mount(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    wrapper.setState({
      open: true,
    });
    wrapper.find(`.${styles.dropdownMenu}`).exists().should.be.true();

    const menuItems = wrapper.find('.dropdown-menu-item');
    menuItems.should.have.length(2);
    menuItems.at(0).text().should.equal('2');
    menuItems.at(1).text().should.equal('3');
  });

  it('should close menu when clicked on an item', function () {
    const wrapper = mount(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    wrapper.find('.dropdown-button').simulate('click');

    const firstMenuItem = wrapper.find('.dropdown-menu-item').at(0);
    firstMenuItem.simulate('click');

    wrapper.find(`.${styles.dropdownMenu}`).exists().should.be.false();
    wrapper.find('.dropdown-menu-item').exists().should.be.false();
  });

  it('should invoke onChange when selected item is changed', function () {
    const onChangeStub = sinon.stub();
    const wrapper = mount(
      <Dropdown
        defaultValue={ '1' }
        onChange={ onChangeStub }
        options={ ['1', '2', '3'] }
      />
    );
    wrapper.setState({
      open: true,
    });

    const firstMenuItem = wrapper.find('.dropdown-menu-item').at(0);
    firstMenuItem.simulate('click');

    wrapper.state('selectedIndex').should.equal(1);
    onChangeStub.should.be.calledWith('2');
  });

  it('should close menu when losing focus', function () {
    const onChangeStub = sinon.stub();
    const wrapper = mount(
      <Dropdown
        defaultValue={ '1' }
        onChange={ onChangeStub }
        options={ ['1', '2', '3'] }
      />
    );
    wrapper.setState({
      open: true,
    });

    wrapper.simulate('blur');

    wrapper.find(`.${styles.dropdownMenu}`).exists().should.be.false();
    wrapper.find('.dropdown-menu-item').exists().should.be.false();

    onChangeStub.should.not.be.called();
  });
});
