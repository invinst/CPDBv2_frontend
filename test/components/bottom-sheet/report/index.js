import React from 'react';

import { CuratedReportFactory } from 'utils/test/factories/report';
import Report from 'components/bottom-sheet/report';

describe('Report component', function () {
  const report = CuratedReportFactory.build();

  it('should render', function () {
    Report.should.be.renderable({ fields: report.fields });
  });
});
