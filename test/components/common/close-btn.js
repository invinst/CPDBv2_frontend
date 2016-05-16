import React from 'react';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {spy} from 'sinon';

import CloseButton from 'components/common/close-btn';
import {unmountComponentSuppressError} from 'utils/test';


describe('CloseButton component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    CloseButton.should.be.renderable();
  });

  it('should trigger onClick callback when clicked on', function () {
    let cb = spy();
    element = renderIntoDocument(<CloseButton onClick={ cb }/>);
    cb.called.should.be.false();

    Simulate.click(findDOMNode(element));
    cb.called.should.be.true();
  });
});
