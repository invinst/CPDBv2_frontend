import React from 'react';
import { findRenderedDOMComponentWithClass, renderIntoDocument, } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Year from 'components/social-graph-page/network/right-pane-section/timeline/item/year';


describe('Year component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render item correctly', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      key: '123456'
    };

    instance = renderIntoDocument(<Year item={ year }/>);

    const showing = findRenderedDOMComponentWithClass(instance, 'content');
    const date = findRenderedDOMComponentWithClass(instance, 'date');

    showing.textContent.should.eql('1994');
    date.textContent.should.eql('1994');
  });
});
