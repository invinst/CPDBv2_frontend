import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MonthSeparator from 'components/common/table/month-separator';


describe('DocumentsOverviewPage MonthSeparator component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render text', function () {
    instance = renderIntoDocument(
      <MonthSeparator text='Jan 2019'/>
    );

    findDOMNode(instance).textContent.should.equal('Jan 2019');
  });
});
