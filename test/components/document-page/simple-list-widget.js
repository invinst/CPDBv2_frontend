import React from 'react';
import should from 'should';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SimpleListWidget from 'components/document-page/simple-list-widget';
import WrappedWithLink from 'components/common/wrapped-with-link';


describe('SimpleListWidget component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing when items is empty', function () {
    instance = renderIntoDocument(
      <SimpleListWidget
        className='simple-list-widget'
        items={ [] }
      />
    );
    should(findDOMNode(instance)).be.null();
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <SimpleListWidget
        className='simple-list-widget'
        items={ [
          { name: 'CRID / UID', value: 'CR 1083633', to: '/complaint/1083633/' },
          {
            name: 'Source',
            value: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
            url: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
          },
        ] }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'simple-list-widget');

    const items = scryRenderedComponentsWithType(instance, WrappedWithLink);

    items.should.have.length(2);

    items[0].props.className.should.eql('list-item');
    items[0].props.to.should.eql('/complaint/1083633/');
    findRenderedDOMComponentWithClass(items[0], 'list-item-name').textContent.should.eql('CRID / UID');
    findRenderedDOMComponentWithClass(items[0], 'list-item-value').textContent.should.eql('CR 1083633');

    items[1].props.className.should.eql('list-item');
    items[1].props.url.should.eql('https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf');
    findRenderedDOMComponentWithClass(items[1], 'list-item-name').textContent.should.eql('Source');
    findRenderedDOMComponentWithClass(items[1], 'list-item-value').textContent.should.eql(
      'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
    );
  });
});
