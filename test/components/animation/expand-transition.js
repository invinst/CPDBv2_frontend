import 'should';
import React from 'react';
import {unmountComponentAtNode, findDOMNode, render} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';

import ExpandTransition from 'components/animation/expand-transition';


describe('ExpandTransition component', function () {
  let element;

  afterEach(function () {
    try {
      unmountComponentAtNode(findDOMNode(element).parentNode);
    } catch (err) {
      // ignore any error
    }
  });

  it('should not render anything when childKey is null', function () {
    element = renderIntoDocument(<ExpandTransition childKey={ null }><p/></ExpandTransition>);
    (findDOMNode(element) === null).should.be.true();
  });

  it('should render child if childKey is not null', function () {
    let testText = 'should be rendered';
    element = renderIntoDocument(<ExpandTransition childKey={ 1 }><p>{ testText }</p></ExpandTransition>);
    findDOMNode(element).innerHTML.should.containEql(testText);
  });

  it('should eventually render nothing as childKey becomes null', function (cb) {
    let rootEl = document.createElement('div');

    element = render(<ExpandTransition childKey={ 1 }><p/></ExpandTransition>, rootEl);

    render(<ExpandTransition childKey={ null }><p/></ExpandTransition>, rootEl, () => {
      rootEl.children.length.should.equal(1);
      setTimeout(() => {
        rootEl.children[0].nodeName.should.equal('NOSCRIPT');
        cb();
      }, 500);
    });
  });
});
