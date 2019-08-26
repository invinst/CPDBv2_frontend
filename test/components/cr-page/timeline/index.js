import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Timeline from 'components/cr-page/timeline';
import CircleSVG from 'components/cr-page/timeline/circles-svg';
import TimelineText from 'components/cr-page/timeline/timeline-text';


describe('Timeline component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CircleSVG and TimelineText with the same props', function () {
    instance = renderIntoDocument(
      <Timeline startDate='2012-12-12' endDate='2013-12-12' incidentDate='2011-12-12'/>
    );
    const circles = findRenderedComponentWithType(instance, CircleSVG);
    circles.props.should.eql({
      startDate: '2012-12-12',
      endDate: '2013-12-12',
      incidentDate: '2011-12-12',
    });
    const text = findRenderedComponentWithType(instance, TimelineText);
    text.props.should.eql({
      startDate: '2012-12-12',
      endDate: '2013-12-12',
      incidentDate: '2011-12-12',
    });
  });
});
