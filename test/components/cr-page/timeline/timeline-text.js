import React from 'react';
import { shallow } from 'enzyme';

import TimelineText from 'components/cr-page/timeline/timeline-text';


describe('TimelineText component', function () {
  const assertTextBlockContent = (wrapper, textBlocks) => {
    const elements = wrapper.find('.timeline-textblock');
    elements.should.have.length(textBlocks.length);
    elements.forEach((element, idx) => {
      element.text().should.eql(textBlocks[idx].join(''));
    });
  };

  it('should render 3 events on separate dates if all dates are provided', function () {
    const wrapper = shallow(
      <TimelineText startDate='2010-01-20' endDate='2010-02-18' incidentDate='2010-01-12'/>
    );
    assertTextBlockContent(wrapper, [
      [
        'Jan 12, 2010',
        'Incident Occurs',
      ], [
        'Jan 20, 2010',
        'Complaint Filed',
      ], [
        'Feb 18, 2010',
        'Investigation Closed',
      ],
    ]);
  });

  it('should group up events that share the same date', function () {
    const wrapper = shallow(
      <TimelineText startDate='2010-01-20' endDate='2010-02-18' incidentDate='2010-01-20'/>
    );
    assertTextBlockContent(wrapper, [
      [
        'Jan 20, 2010',
        'Incident Occurs',
        'Complaint Filed',
      ], [
        'Feb 18, 2010',
        'Investigation Closed',
      ],
    ]);
  });

  it('should not show date if a date isn\'t associated with an event', function () {

    const wrapper = shallow(
      <TimelineText startDate='2010-01-20' incidentDate='2010-01-20'/>
    );
    assertTextBlockContent(wrapper, [
      [
        'Jan 20, 2010',
        'Incident Occurs',
        'Complaint Filed',
      ], [
        'Investigation Closed',
      ],
    ]);
  });
});
