import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('utils/test', function () {
  describe('unmountComponentSuppressError function', function () {
    it('should suppress error when receive non-component', function () {
      unmountComponentSuppressError(null);
    });

    it('should unmount component when argument is mounted component', function () {
      let component = renderIntoDocument(<p/>);
      unmountComponentSuppressError(component);
      (findDOMNode(component).parentNode === null).should.be.true();
    });
  });

  describe('reRender function', function () {
    class Dummy extends Component {
      render() {
        return this.props.children;
      }
    }

    Dummy.propTypes = {
      children: PropTypes.node,
    };

    it('should re-render component on the same parent node', function () {
      const component1 = renderIntoDocument(<Dummy><p/></Dummy>);
      findRenderedDOMComponentWithTag(component1, 'p');
      const component2 = reRender(<Dummy><div/></Dummy>, component1);
      findRenderedDOMComponentWithTag(component2, 'div');
      findDOMNode(component1).should.equal(findDOMNode(component2));
    });

    it('should invoke callback if passed', function (callback) {
      const component = renderIntoDocument(<Dummy><p/></Dummy>);
      reRender(<Dummy><p/></Dummy>, component, callback);
    });
  });
});
