import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import Header from 'components/header';
import { unmountComponentSuppressError } from 'utils/test';


describe('Header component', function () {
  let element;
  let callback = null;

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

  it('should set state fixed to true when scrollY > 88', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 89;
    callback();
    element.state.fixed.should.be.true();
  });

  it('should set state fixed to false when scrollY < 88', function () {
    element = renderIntoDocument(<Header/>);
    window.scrollY = 80;
    callback();
    element.state.fixed.should.be.false();
  });
});
