import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TimelineSection from 'components/social-graph-page/social-graph-pane-section/timeline-section';
import AllegationRow from 'components/social-graph-page/social-graph-pane-section/timeline-section/allegation-row';


describe('TimelineSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer row(s) correctly', function () {
    const allegations = [{
      crid: 123,
      incidentDate: '1988-10-03',
      category: 'Use of Force',
      subcategory: 'Miscellaneous'
    }, {
      crid: 456,
      incidentDate: '1988-10-03',
      category: 'Illegal Search',
      subcategory: 'Unknown'
    }];
    instance = renderIntoDocument(<TimelineSection allegations={ allegations }/>);
    const allegationRows = scryRenderedComponentsWithType(instance, AllegationRow);
    allegationRows.should.have.length(2);
  });
});
