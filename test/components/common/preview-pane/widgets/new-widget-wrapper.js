import React from 'react';
import MediaQuery from 'react-responsive';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { NewWidgetWrapper, TextWidget, NewCallToActionWidget } from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('NewWidgetWrapper component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain child components', () => {
    instance = renderIntoDocument(
      <NewWidgetWrapper callToAction={ { url: 'path', to: 'death', text: 'back' } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );
    findRenderedComponentWithType(instance, TextWidget);
    const callToAction = findRenderedComponentWithType(instance, NewCallToActionWidget);
    callToAction.props.text.should.equal('back');

    findRenderedComponentWithType(instance, MediaQuery).props.maxHeight.should.equal(146);

    instance = reRender(
      <NewWidgetWrapper callToAction={ { text: 'back' } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>,
      instance
    );

    scryRenderedComponentsWithType(instance, NewCallToActionWidget).should.have.length(0);
    findRenderedComponentWithType(instance, MediaQuery).props.maxHeight.should.equal(106);
  });

  it('should handle scrollable properly', function () {
    instance = renderIntoDocument(
      <NewWidgetWrapper yScrollable={ false }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );

    scryRenderedDOMComponentsWithClass(instance, 'y-scrollable').should.have.length(0);

    reRender(
      <NewWidgetWrapper yScrollable={ true }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>,
      instance
    );

    scryRenderedDOMComponentsWithClass(instance, 'y-scrollable').should.have.length(1);
  });

  it('should not display overlay gradient if scrollable', function () {
    instance = renderIntoDocument(
      <NewWidgetWrapper yScrollable={ true }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );

    scryRenderedComponentsWithType(instance, MediaQuery).should.have.length(0);
  });
});
