import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MonthSeparator from 'components/documents-overview-page/month-separator';


describe('DocumentsOverviewPage MonthSeparator component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render text', function () {
    instance = renderIntoDocument(
      <MonthSeparator text='Jan 2019'/>
    );

    findRenderedDOMComponentWithClass(instance, 'month-separator').textContent.should.eql('Jan 2019');
  });
});
