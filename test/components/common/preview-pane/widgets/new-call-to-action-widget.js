import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import NewCallToActionWidget from 'components/common/preview-pane/widgets/new-call-to-action-widget';


describe('NewCallToActionWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', () => {
    instance = renderIntoDocument(
      <NewCallToActionWidget text={ 'Custom Text' }/>
    );

    const text = findRenderedDOMComponentWithClass(instance, 'new-call-to-action-widget-text');
    text.textContent.should.eql('Custom Text');
    findRenderedDOMComponentWithClass(instance, 'new-call-to-action-widget-button');
  });

  it('should have default text', () => {
    instance = renderIntoDocument(<NewCallToActionWidget/>);

    const text = findRenderedDOMComponentWithClass(instance, 'new-call-to-action-widget-text');
    text.textContent.should.eql('View on the Data Tool');
  });
});
