import React from 'react';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType, Simulate
} from 'react-addons-test-utils';
import { browserHistory } from 'react-router';

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

  it('should set state showCompact to true when scrollY > 88', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 89;
    callback();
    element.state.showCompact.should.be.true();
  });

  it('should set state showCompact to false when scrollY < 88', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 80;
    callback();
    element.state.showCompact.should.be.false();
  });

  it('should not show close button when at base path', function () {
    browserHistory.push('/');
    element = renderIntoDocument(<Header/>);
    scryRenderedComponentsWithType(element, CloseButton).length.should.equal(0);
  });

  it('should show close button when at valid paths', function () {
    [COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH].forEach(path => {
      browserHistory.push(path);
      element = renderIntoDocument(<Header/>);
      scryRenderedComponentsWithType(element, CloseButton).length.should.equal(1);
      unmountComponentSuppressError(element);
    });
  });

  it('should push base path when click on close button', function () {
    browserHistory.push(COLLAB_PATH);
    element = renderIntoDocument(<Header/>);
    let button = findRenderedComponentWithType(element, CloseButton);
    Simulate.click(findDOMNode(button));
    getCurrentPathname().should.equal('/');
  });
});
