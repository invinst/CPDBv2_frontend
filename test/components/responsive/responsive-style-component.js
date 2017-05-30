import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';

describe('ResponsiveStyleComponent component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children with corresponding style', function () {
    const children = stub().returns(<div/>);
    const obj1 = {};
    const obj2 = {};
    const obj3 = {};
    const obj4 = {};
    instance = renderIntoDocument(
      <ResponsiveStyleComponent responsiveStyle={ {
        [EXTRA_WIDE]: obj1,
        [DESKTOP]: obj2,
        [TABLET]: obj3,
        [MOBILE]: obj4
      } }>
        { children }
      </ResponsiveStyleComponent>
    );
    children.calledWith(obj1).should.be.true();
    children.calledWith(obj2).should.be.true();
    children.calledWith(obj3).should.be.true();
    children.calledWith(obj4).should.be.true();
  });
});
