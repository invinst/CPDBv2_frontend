import { createElement } from 'react';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import should from 'should';
import _ from 'lodash';


should.Assertion.add('renderable', function () {
  let element = renderIntoDocument(createElement(this.obj));

  element.should.be.ok();

  unmountComponentAtNode(findDOMNode(element).parentNode);
});


should.Assertion.add('responsiveRenderable', function () {
  let devices = ['mobile', 'tablet', 'desktop'];

  _.each(devices, (device) => {
    let element = renderIntoDocument(createElement(this.obj, { device: device }));
    element.should.be.ok();
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });
});
