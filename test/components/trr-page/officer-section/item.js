import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Item from 'components/trr-page/officer-section/item';


describe('Item component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and value only if subValue and additionalComponent are not passed in', function () {
    instance = renderIntoDocument(<Item title='Some title' value='Some value'/>);
    findRenderedDOMComponentWithClass(instance, 'test--item-title').textContent.should.containEql('Some title');
    findRenderedDOMComponentWithClass(instance, 'test--item-value').textContent.should.containEql('Some value');
    scryRenderedDOMComponentsWithClass(instance, 'test--item-sub-value').should.have.length(0);
  });

  it('should render subValue and additionalComponent if they are available', function () {
    instance = renderIntoDocument(
      <Item
        title='Some title'
        value='Some value'
        subValue='Some subValue'
        extraComponent={
          <span className='test--officer-section-item-extra-component'>additionalComponent</span>
        }
      />
    );
    findRenderedDOMComponentWithClass(instance, 'test--item-sub-value').textContent.should.containEql('Some subValue');
    findRenderedDOMComponentWithClass(
      instance,
      'test--officer-section-item-extra-component'
    ).textContent.should.containEql('additionalComponent');
  });
});
