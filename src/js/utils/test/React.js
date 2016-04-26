import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import should from 'should';
import _ from 'lodash';


should.Assertion.add('renderable', function () {
  let element = ReactTestUtils.renderIntoDocument(React.createElement(this.obj));

  element.should.be.ok();

  ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(element).parentNode);
});


should.Assertion.add('responsiveRenderable', function () {
  let devices = ['mobile', 'tablet', 'desktop'];

  _.each(devices, (device) => {
    let element = ReactTestUtils.renderIntoDocument(React.createElement(this.obj, { device: device }));
    element.should.be.ok();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(element).parentNode);
  });
});
