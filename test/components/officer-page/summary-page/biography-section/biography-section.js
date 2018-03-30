import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import BiographySection from 'components/officer-page/summary-page/biography-section';
import Timeline from 'components/officer-page/summary-page/biography-section/timeline';


describe('BiographySection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names', function () {
    instance = renderIntoDocument(<BiographySection />);

    const biographyMenu = findRenderedDOMComponentWithClass(instance, 'test--biography-section-menu');

    biographyMenu.textContent.should.eql('TIMELINESUMMARYMAPCOACCUSALSATTACHMENTS');
    scryRenderedDOMComponentsWithClass(instance, 'test--biography-tab-name').length.should.eql(5);
  });

  it('should render Timeline by default', function () {
    instance = renderIntoDocument(<BiographySection />);

    findRenderedComponentWithType(instance, Timeline).should.be.ok();
  });
});
