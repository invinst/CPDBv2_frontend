import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import BreadcrumbsItem from 'components/headers/shareable-header/breadcrumbs-item';


describe('BreadcrumbsItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a string with correct style', function () {
    instance = renderIntoDocument(
      <BreadcrumbsItem>some string</BreadcrumbsItem>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-item');
    item.style.getPropertyValue('color').should.eql('rgb(35, 31, 32)');
  });

  it('should render a link with correct style', function () {
    instance = renderIntoDocument(
      <BreadcrumbsItem><a className='test--breadcrumbs-link'>some link</a></BreadcrumbsItem>
    );
    const item = findRenderedDOMComponentWithClass(instance, 'test--breadcrumbs-link');
    item.style.getPropertyValue('color').should.eql('rgb(143, 143, 143)');
  });
});
