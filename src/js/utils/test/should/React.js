import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import {
  renderIntoDocument, Simulate, scryRenderedDOMComponentsWithClass, findRenderedComponentWithType
} from 'react-addons-test-utils';
import should from 'should';
import { each, assign } from 'lodash';
import { spy } from 'sinon';

import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


function assertRender(obj, props) {
  let element;
  if (props && props.store) {
    const { store, ...otherProps } = props;
    element = renderIntoDocument(
      <Provider store={ store }>
        { createElement(obj, otherProps) }
      </Provider>
    );
  } else {
    element = renderIntoDocument(createElement(obj, props));
  }

  element.should.be.ok();

  unmountComponentAtNode(findDOMNode(element).parentNode);
}

should.Assertion.add('renderable', function (props) {
  this.params = { operator: 'to be rendered' };
  assertRender(this.obj, props);
});


should.Assertion.add('responsiveRenderable', function (props) {
  this.params = { operator: 'to be responsive-rendered' };
  let devices = [MOBILE, TABLET, DESKTOP, EXTRA_WIDE];

  each(devices, (device) => {
    assertRender(this.obj, assign({}, props, { device: device }));
  });
});


should.Assertion.add('displayNothing', function () {
  should(findDOMNode(this.obj)).be.null();
});


should.Assertion.add('displaySomething', function () {
  should(findDOMNode(this.obj)).not.be.null();
});


should.Assertion.add('triggerCallbackWhenClick', function (callbackProp, target=null, props={}, expectedArg=null) {
  const callback = spy();
  let element = renderIntoDocument(createElement(this.obj, assign({}, props, { [callbackProp]: callback })));

  if (typeof target === 'string') {
    Simulate.click(scryRenderedDOMComponentsWithClass(element, target)[0]);
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

should.Assertion.add('renderSubComponent', function () {
  class Dummy extends Component {
    render() {
      return <div/>;
    }
  }
  const DecoratedDummy = this.obj(Dummy);
  const instance = renderIntoDocument(<DecoratedDummy a='b'/>);
  const element = findRenderedComponentWithType(instance, Dummy);
  element.props.a.should.equal('b');
  unmountComponentAtNode(findDOMNode(instance).parentNode);
});
