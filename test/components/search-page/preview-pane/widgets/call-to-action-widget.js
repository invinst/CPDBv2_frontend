import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import CallToActionWidget from 'components/search-page/preview-pane/widgets/call-to-action-widget';


describe('CallToActionWidget component', () => {
  let instance;

  it('should be renderable', () => {
    CallToActionWidget.should.be.renderable();
  });

  it('should contain a Link component when it has `to` property', () => {
    instance = renderIntoDocument(
      <CallToActionWidget to='officer/1' url=''/>
    );
    findRenderedComponentWithType(instance, Link);
  });
});
