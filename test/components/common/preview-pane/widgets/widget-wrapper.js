import React from 'react';
import MediaQuery from 'react-responsive';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import WidgetWrapper, { TextWidget, CallToActionWidget } from 'components/common/preview-pane/widgets';
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
    findRenderedComponentWithType(instance, TextWidget);
    const callToAction = findRenderedComponentWithType(instance, CallToActionWidget);
    callToAction.props.text.should.equal('back');

    const mediaQuery = findRenderedComponentWithType(instance, MediaQuery);
    mediaQuery.props.maxHeight.should.equal(500);
  });

  it('should hide call to action if both url and to are missing', function () {
    instance = renderIntoDocument(
      <WidgetWrapper>
        <TextWidget title={ 'title' } />
      </WidgetWrapper>
    );
    scryRenderedComponentsWithType(instance, CallToActionWidget).should.have.length(0);
  });

  it('should not display overlay at the bottom if yScrollable', function () {
    instance = renderIntoDocument(
      <WidgetWrapper yScrollable={ true }>
        <TextWidget title={ 'title' } />
      </WidgetWrapper>
    );
    scryRenderedComponentsWithType(instance, MediaQuery).should.have.length(0);
  });
});
