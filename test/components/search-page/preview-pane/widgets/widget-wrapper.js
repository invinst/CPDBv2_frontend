import React from 'react';
import MediaQuery from 'react-responsive';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import WidgetWrapper, { TextWidget, CallToActionWidget } from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('WidgetWrapper component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain children components', () => {
    instance = renderIntoDocument(
      <WidgetWrapper maxHeight={ 500 } callToAction={ { url: 'path', to: 'death', text: 'back' } }>
        <TextWidget title={ 'title' }/>
      </WidgetWrapper>
    );
    findRenderedComponentWithType(instance, TextWidget).should.not.be.null();
    const callToAction = findRenderedComponentWithType(instance, CallToActionWidget);
    callToAction.props.url.should.equal('path');
    callToAction.props.death.should.equal('death');
    callToAction.props.back.should.equal('back');

    const mediaQuery = findRenderedComponentWithType(instance, MediaQuery);
    mediaQuery.props.maxHeight.should.equal(500);
  });
});
