import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import ReportGroup from 'components/reporting-page/report-group';
import { unmountComponentSuppressError } from 'utils/test';


describe('ReportingSectionContent component', function () {
  let instance;
  const reportGroups = [{ key: 1 }, { key: 2 }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const onReportClick = () => {};
    instance = renderIntoDocument(
      <ReportingSectionContent reportGroups={ reportGroups } onReportClick={ onReportClick }/>
    );
    const group = scryRenderedComponentsWithType(instance, ReportGroup)[0];
    group.props.onReportClick.should.eql(onReportClick);
  });
});
