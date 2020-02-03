import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { communityFactory } from 'utils/test/factories/heat-map';
import TextInput from 'components/common/input';
import Dropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


describe('Dropdown component', function () {
  it('should render all communities', function () {
    const wrapper = shallow(
      <Dropdown
        communities={ [
          communityFactory.build({ name: 'Hyde Park' }),
          communityFactory.build({ name: 'Lincoln Square' }),
        ] }
      />
    );
    const communities = wrapper.find(MinimalScrollBars).dive().dive();
    communities.text().should.containEql('Hyde Park');
    communities.text().should.containEql('Lincoln Square');
  });

  it('should filter out communities when user type in something', function () {
    const wrapper = mount(
      <Dropdown
        communities={ [
          communityFactory.build({ name: 'Hyde Park' }),
          communityFactory.build({ name: 'Lincoln Square' }),
        ] }
      />
    );
    const input = wrapper.find(TextInput);
    input.prop('onChange')({ currentTarget: { value: 'hy' } });

    wrapper.text().should.containEql('Hyde Park');
    wrapper.text().should.not.containEql('Lincoln Square');
  });

  it('should trigger selectCommunity', function () {
    const selectCommunity = sinon.spy();
    const wrapper = shallow(
      <Dropdown
        selectCommunity={ selectCommunity }
        communities={ [
          communityFactory.build({ id: 101 }),
          communityFactory.build(),
        ] }
      />
    );

    wrapper.find('.test--dropdown-item').at(0).simulate('click');
    selectCommunity.calledWith(101).should.be.true();
  });

  it('should trigger closeDropdown when click on arrow', function () {
    const closeDropdown = sinon.spy();
    const wrapper = shallow(
      <Dropdown closeDropdown={ closeDropdown }/>
    );

    wrapper.find('.test--dropdown-up-arrow').simulate('click');
    closeDropdown.called.should.be.true();
  });

  it('should select first filtered community', function () {
    const communities = [
      communityFactory.build({ id: 301 }),
      communityFactory.build({ id: 302 }),
    ];
    const selectCommunity = sinon.spy();
    const wrapper = shallow(
      <Dropdown
        communities={ communities }
        selectCommunity={ selectCommunity }
      />
    );

    const input = wrapper.find(TextInput);
    input.prop('keyPressHandlers').enter();
    selectCommunity.calledWith(301).should.be.true();
  });

  it('should render MinimalScrollBars', function () {
    const wrapper = shallow(<Dropdown/>);
    wrapper.find(MinimalScrollBars).exists().should.be.true();
  });
});
