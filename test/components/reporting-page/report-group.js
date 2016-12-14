import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ReportGroup from 'components/reporting-page/report-group';
import { ReportCardFactory } from 'utils/test/factories/report';
import Report from 'components/common/report/report';


describe('ReportGroup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    instance = renderIntoDocument(
      <ReportGroup
        reports={ ReportCardFactory.buildList(3) }
      />
    );
    scryRenderedComponentsWithType(instance, Report).length.should.eql(3);
  });
});
