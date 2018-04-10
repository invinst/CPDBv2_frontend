import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import WidgetWrapper, { TextWidget } from 'components/search-page/preview-pane/widgets';


describe('WidgetWrapper component', () => {
  let instance;

  it('should contain children components', () => {
    instance = renderIntoDocument(
      <WidgetWrapper>
        <TextWidget title={ 'title' }/>
      </WidgetWrapper>
    );
    findRenderedComponentWithType(instance, TextWidget).should.not.be.null();
  });
});
