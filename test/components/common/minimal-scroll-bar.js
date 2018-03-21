import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import { Scrollbars } from 'react-custom-scrollbars';


describe('MinimalScrollBars component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Custom Scrollbars with received style', function () {
    const styleStub = stub();
    instance = renderIntoDocument(<MinimalScrollBars style={ styleStub } />);
    const scrollbars = findRenderedComponentWithType(instance, Scrollbars);
    scrollbars.props.style.should.eql(styleStub);
  });
});
