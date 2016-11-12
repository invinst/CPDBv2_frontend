import React from 'react';

import Report from 'components/common/report/report';

describe('Report component', function () {
  it('should trigger onClick', function () {
    Report.should.triggerCallbackWhenClick('onClick', 'report', { report: { id: 1 } }, 1);
  });
});
