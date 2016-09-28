import React from 'react';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType, Simulate
} from 'react-addons-test-utils';

import Header from 'components/header';
import CloseButton from 'components/common/close-btn';
import { getCurrentPathname } from 'utils/dom';
import { COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';


describe('Header component', function () {
  let element;
  let callback;

  beforeEach(function () {
    stub(window, 'addEventListener', (evt, cb) => {
      if (evt === 'scroll') {
        callback = cb;
      }
    });
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
    window.addEventListener.restore();
  });

  it('should render', function () {
    Header.should.be.renderable();
  });

  it('should set state showCompact to true when scrollY > 145', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 146;
    callback();
    element.state.showCompact.should.be.true();
  });

  it('should set state showCompact to false when scrollY < 145', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 140;
    callback();
    element.state.showCompact.should.be.false();
  });

  it('should not show close button when at base path', function () {
    element = renderIntoDocument(<Header pathname='/'/>);
    scryRenderedComponentsWithType(element, CloseButton).length.should.equal(0);
  });

  it('should show close button when at valid paths', function () {
    [COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH].forEach(path => {
      element = renderIntoDocument(<Header pathname={ path }/>);
      scryRenderedComponentsWithType(element, CloseButton).length.should.equal(1);
      unmountComponentSuppressError(element);
    });
  });

  it('should push base path when click on close button', function () {
    element = renderIntoDocument(<Header pathname={ COLLAB_PATH }/>);
    let button = findRenderedComponentWithType(element, CloseButton);
    Simulate.click(findDOMNode(button));
    getCurrentPathname().should.equal('/');
  });
});
