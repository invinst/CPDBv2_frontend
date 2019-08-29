import React from 'react';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, findRenderedComponentWithType, Simulate,
  scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { communityFactory } from 'utils/test/factories/heat-map';
import TextInput from 'components/common/input';
import Dropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


describe('Dropdown component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all communities', function () {
    instance = renderIntoDocument(
      <Dropdown
        communities={ [
          communityFactory.build({ name: 'Hyde Park' }),
          communityFactory.build({ name: 'Lincoln Square' }),
        ] }
      />
    );
    const element = findDOMNode(instance);
    element.innerHTML.should.containEql('Hyde Park');
    element.innerHTML.should.containEql('Lincoln Square');
  });

  it('should filter out communities when user type in something', function () {
    instance = renderIntoDocument(
      <Dropdown
        communities={ [
          communityFactory.build({ name: 'Hyde Park' }),
          communityFactory.build({ name: 'Lincoln Square' }),
        ] }
      />
    );
    const input = findRenderedComponentWithType(instance, TextInput);
    input.props.onChange({ currentTarget: { value: 'hy' } });
    const element = findDOMNode(instance);
    element.innerHTML.should.containEql('Hyde Park');
    element.innerHTML.should.not.containEql('Lincoln Square');
  });

  it('should trigger selectCommunity', function () {
    const selectCommunity = spy();
    instance = renderIntoDocument(
      <Dropdown
        selectCommunity={ selectCommunity }
        communities={ [
          communityFactory.build({ id: 101 }),
          communityFactory.build(),
        ] }
      />
    );

    Simulate.click(scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-item')[0]);
    selectCommunity.calledWith(101).should.be.true();
  });

  it('should trigger closeDropdown when click on arrow', function () {
    const closeDropdown = spy();
    instance = renderIntoDocument(
      <Dropdown closeDropdown={ closeDropdown }/>
    );

    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--dropdown-up-arrow'));
    closeDropdown.called.should.be.true();
  });

  it('should select first filtered community', function () {
    const communities = [
      communityFactory.build({ id: 301 }),
      communityFactory.build({ id: 302 }),
    ];
    const selectCommunity = spy();
    instance = renderIntoDocument(
      <Dropdown
        communities={ communities }
        selectCommunity={ selectCommunity }
      />
    );

    const input = findRenderedComponentWithType(instance, TextInput);
    input.props.keyPressHandlers.enter();
    selectCommunity.calledWith(301).should.be.true();
  });

  it('should render MinimalScrollBars', function () {
    instance = renderIntoDocument(<Dropdown/>);
    findRenderedComponentWithType(instance, MinimalScrollBars).should.be.ok();
  });
});
