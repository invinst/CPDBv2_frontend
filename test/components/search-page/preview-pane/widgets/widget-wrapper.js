import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import WidgetWrapper, { TextWidget } from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('WidgetWrapper component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain children components', () => {
    instance = renderIntoDocument(
      <WidgetWrapper>
        <TextWidget title={ 'title' }/>
      </WidgetWrapper>
    );
    findRenderedComponentWithType(instance, TextWidget).should.not.be.null();
  });
});
