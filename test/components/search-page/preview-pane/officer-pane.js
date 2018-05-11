import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { OfficerPane } from 'components/search-page/preview-pane';
import {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
  CallToActionWidget,
} from 'components/search-page/preview-pane/widgets';


describe('OfficerPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <OfficerPane/>
    );
    findRenderedComponentWithType(instance, VisualTokenWidget);
    findRenderedComponentWithType(instance, OfficerInfoWidget);
    findRenderedComponentWithType(instance, MetricWidget);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });

  it('should render CallToActionWidget with "View Officer Profile" text', () => {
    instance = renderIntoDocument(
      <OfficerPane/>
    );

    findRenderedComponentWithType(instance, CallToActionWidget).props.text.should.eql('View Officer Profile');
  });
});
