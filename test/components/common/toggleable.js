import 'should';
import { spy } from 'sinon';
import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate
} from 'react-addons-test-utils';

import Toggleable from 'components/common/toggleable';


describe('Toggleable higher order component', function () {
  let element;
  const ComposedComponent = Toggleable(props => (<div/>));

  it('should trigger onClose when click while active', function () {
    let identifier = '1';
    let onClose = spy();
    element = renderIntoDocument(<ComposedComponent active={ true } onClose={ onClose } identifier={ identifier }/>);
    Simulate.click(scryRenderedDOMComponentsWithTag(element, 'div')[0]);
    onClose.calledWith(identifier).should.be.true();
  });

  it('should trigger onOpen when click while inactive', function () {
    let identifier = '1';
    let onOpen = spy();
    element = renderIntoDocument(<ComposedComponent active={ false } onOpen={ onOpen } identifier={ identifier }/>);
    Simulate.click(scryRenderedDOMComponentsWithTag(element, 'div')[0]);
    onOpen.calledWith(identifier).should.be.true();
  });
});
