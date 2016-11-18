import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import { SimpleReportFactory } from 'utils/test/factories/report';
import Report from 'components/common/report/report';
import { unmountComponentSuppressError } from 'utils/test';


describe('ReportingSectionContent component', function () {
  let instance;
  const reports = SimpleReportFactory.buildList(3);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const onStoryClick = () => {};
    instance = renderIntoDocument(
      <ReportingSectionContent reports={ reports } onStoryClick={ onStoryClick }/>
    );
    const report = scryRenderedComponentsWithType(instance, Report)[0];
    report.props.onClick.should.eql(onStoryClick);
  });
});
