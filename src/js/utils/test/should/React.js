import { createElement } from 'react';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import should from 'should';
import { each, assign } from 'lodash';
import { spy } from 'sinon';


should.Assertion.add('renderable', function (props) {
  this.params = { operator: 'to be rendered' };
  let element = renderIntoDocument(createElement(this.obj, props));

  element.should.be.ok();

  unmountComponentAtNode(findDOMNode(element).parentNode);
});


should.Assertion.add('responsiveRenderable', function (props) {
  let devices = ['mobile', 'tablet', 'desktop', 'extra_wide'];

  each(devices, (device) => {
    let element = renderIntoDocument(createElement(this.obj, assign({}, props, { device: device })));
    element.should.be.ok();
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });
});


should.Assertion.add('displayNothing', function () {
  should(findDOMNode(this.obj)).be.null();
});


should.Assertion.add('displaySomething', function () {
  should(findDOMNode(this.obj)).not.be.null();
});


should.Assertion.add('triggerCallbackWhenClick', function (callbackProp, clickClass=null, props={}, expectedArg=null) {
  const callback = spy();
  let element = renderIntoDocument(createElement(this.obj, assign({}, props, { [callbackProp]: callback })));

  if (clickClass !== null) {
    Simulate.click(scryRenderedDOMComponentsWithClass(element, clickClass)[0]);
  } else {
    Simulate.click(findDOMNode(element));
  }

  if (expectedArg !== null) {
    callback.calledWith(expectedArg).should.be.true();
  } else {
    callback.called.should.be.true();
  }

  unmountComponentAtNode(findDOMNode(element).parentNode);
});
