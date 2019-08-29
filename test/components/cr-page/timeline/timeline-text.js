import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TimelineText from 'components/cr-page/timeline/timeline-text';


describe('TimelineText component', function () {
  let instance;

  const assertTextBlockContent = (instance, textBlocks) => {
    const elements = scryRenderedDOMComponentsWithClass(instance, 'timeline-textblock');
    elements.should.have.length(textBlocks.length);
    for (let ind in elements) {
      elements[ind].textContent.should.eql(textBlocks[ind].join(''));
    }
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 3 events on separate dates if all dates are provided', function () {
    instance = renderIntoDocument(
      <TimelineText startDate='2010-01-20' endDate='2010-02-18' incidentDate='2010-01-12'/>
    );
    assertTextBlockContent(instance, [
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
    instance = renderIntoDocument(
      <TimelineText startDate='2010-01-20' endDate='2010-02-18' incidentDate='2010-01-20'/>
    );
    assertTextBlockContent(instance, [
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

    instance = renderIntoDocument(
      <TimelineText startDate='2010-01-20' incidentDate='2010-01-20'/>
    );
    assertTextBlockContent(instance, [
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
