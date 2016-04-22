import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelloWorld from 'app';
import 'should';

describe('<HelloWorld> Component', function () {
  it('should show the name property', function () {
    let dom = TestUtils.renderIntoDocument(<HelloWorld name='Foobar'/>);
    TestUtils.findRenderedDOMComponentWithTag(dom, 'h1').textContent.should.containEql('Foobar');
  });
});
