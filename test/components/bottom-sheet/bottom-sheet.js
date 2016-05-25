import React from 'react';
import { render } from 'react-dom';

import BottomSheet from 'components/bottom-sheet/bottom-sheet';
import { unmountComponentSuppressError } from 'utils/test';


describe('BottomSheet component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render nothing at first and eventually render bottom sheet when open become true', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ false }><p/></BottomSheet>,
      rootEl);

    render(
      <BottomSheet open={ true }><p/></BottomSheet>,
      rootEl, () => {
        rootEl.children[0].children[0].nodeName.should.equal('NOSCRIPT');
        setTimeout(() => {
          rootEl.children[0].children[0].nodeName.should.equal('DIV');
          callback();
        }, 300);
      });
  });

  it('should render bottom sheet at first and eventually render nothing when open become false', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ true }><p/></BottomSheet>,
      rootEl);

    render(
      <BottomSheet open={ false }><p/></BottomSheet>,
      rootEl, () => {
        rootEl.children[0].children[0].nodeName.should.equal('DIV');
        setTimeout(() => {
          rootEl.children[0].children[0].nodeName.should.equal('NOSCRIPT');
          callback();
        }, 500);
      });
  });
});
