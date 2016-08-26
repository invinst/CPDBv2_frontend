import React from 'react';
import { StyleRoot } from 'radium';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Spinner from 'components/animation/spinner';


describe('Spinner component', function () {
  it('should be renderable', function () {
    let instance = renderIntoDocument(<StyleRoot><Spinner/></StyleRoot>);
    instance.should.be.ok();
    unmountComponentSuppressError(instance);
  });
});
