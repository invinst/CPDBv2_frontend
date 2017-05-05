import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { CRItem } from 'components/officer-page/timeline-page/cr-item';


describe('CRItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CRItem.should.be.renderable();
  });

  it('should trigger onClick when clicked on', function () {
    CRItem.should.triggerCallbackWhenClick('onClick', null, { item: { crid: '123456' } }, '123456');
  });

  it('should render document icon when item has document', function () {
    instance = renderIntoDocument(<CRItem item={ { hasDocument: true } }/>);
    findRenderedDOMComponentWithClass(instance, 'test--document-icon');
  });

  it('should render audio icon when item has document', function () {
    instance = renderIntoDocument(<CRItem item={ { hasAudio: true } }/>);
    findRenderedDOMComponentWithClass(instance, 'test--audio-icon');
  });
});
