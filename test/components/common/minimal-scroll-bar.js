import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import { Scrollbars } from 'react-custom-scrollbars';


describe('MinimalScrollBars component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Custom Scrollbars with received style', function () {
    const styleObj = {};
    instance = renderIntoDocument(<MinimalScrollBars style={ styleObj } />);
    const scrollbars = findRenderedComponentWithType(instance, Scrollbars);
    scrollbars.props.style.should.eql(styleObj);
  });
});
