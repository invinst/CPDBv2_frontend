import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';


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
});
