import React from 'react';
import { shallow } from 'enzyme';

import Timeline from 'components/cr-page/timeline';
import CircleSVG from 'components/cr-page/timeline/circles-svg';
import TimelineText from 'components/cr-page/timeline/timeline-text';


describe('Timeline component', function () {
  it('should render CircleSVG and TimelineText with the same props', function () {
    const wrapper = shallow(
      <Timeline startDate='2012-12-12' endDate='2013-12-12' incidentDate='2011-12-12'/>
    );
    const circles = wrapper.find(CircleSVG);
    circles.props().should.eql({
      startDate: '2012-12-12',
      endDate: '2013-12-12',
      incidentDate: '2011-12-12',
    });
    const text = wrapper.find(TimelineText);
    text.props().should.eql({
      startDate: '2012-12-12',
      endDate: '2013-12-12',
      incidentDate: '2011-12-12',
    });
  });
});
