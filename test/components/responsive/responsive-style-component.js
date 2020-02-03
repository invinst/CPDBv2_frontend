import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';

describe('ResponsiveStyleComponent component', function () {
  it('should render children with corresponding style', function () {
    const children = sinon.stub().returns(<div/>);
    const obj1 = {};
    const obj2 = {};
    const obj3 = {};
    const obj4 = {};
    shallow(
      <ResponsiveStyleComponent responsiveStyle={ {
        [EXTRA_WIDE]: obj1,
        [DESKTOP]: obj2,
        [TABLET]: obj3,
        [MOBILE]: obj4,
      } }>
        { children }
      </ResponsiveStyleComponent>
    );
    children.should.be.calledWith(obj1);
    children.should.be.calledWith(obj2);
    children.should.be.calledWith(obj3);
    children.should.be.calledWith(obj4);
  });
});
