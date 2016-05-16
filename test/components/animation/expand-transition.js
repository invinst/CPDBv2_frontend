import 'should';
import React from 'react';
import { findDOMNode, render } from 'react-dom';
import { unmountComponentSuppressError } from 'utils/test';
import { renderIntoDocument } from 'react-addons-test-utils';

import { withAnimationDisabled } from 'utils/test';
import ExpandTransition from 'components/animation/expand-transition';


describe('ExpandTransition component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should not render anything when childKey is null initially', function () {
    element = renderIntoDocument(<ExpandTransition childKey={ null }><p/></ExpandTransition>);
    element.should.displayNothing();
  });

  it('should render children immediately when animation is disabled', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<ExpandTransition childKey={ 1 }><p/></ExpandTransition>);
      findDOMNode(element).nodeName.should.equal('P');
    });
  });

  it('should render child if childKey is not null', function () {
    let testText = 'should be rendered';
    element = renderIntoDocument(<ExpandTransition childKey={ 1 }><p>{ testText }</p></ExpandTransition>);
    findDOMNode(element).innerHTML.should.containEql(testText);
  });

  it('should eventually render nothing as childKey becomes null', function (cb) {
    let rootEl = document.createElement('div');
    let cb1 = () => {}, cb2 = () => {};

    element = render(
      <ExpandTransition childKey={ 1 } onFullyClosed={ cb1 } onExpansionBegin={ cb2 }><p/></ExpandTransition>,
      rootEl);

    render(
      <ExpandTransition childKey={ null } onFullyClosed={ cb1 } onExpansionBegin={ cb2 }><p/></ExpandTransition>,
      rootEl, () => {
        rootEl.children.length.should.equal(1);
        setTimeout(() => {
          rootEl.children[0].nodeName.should.equal('NOSCRIPT');
          cb();
        }, 500);
      });
  });
});
