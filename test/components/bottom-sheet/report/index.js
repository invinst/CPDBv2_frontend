import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { CuratedReportFactory } from 'utils/test/factories/report';
import Report from 'components/bottom-sheet/report';

describe('Report component', function () {
  const report = CuratedReportFactory.build();
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    Report.should.be.renderable({ fields: report.fields });
  });

  it('should call fetch report if receive a numeric id', function () {
    const fetchReport = spy();
    instance = renderIntoDocument(<Report fetchReport={ fetchReport } reportId={ 1 }/>);
    fetchReport.calledOnce.should.be.true();
  });

  it('should not call fetch report if does not receive a numeric id', function () {
    const fetchReport = spy();
    instance = renderIntoDocument(<Report fetchReport={ fetchReport } reportId='new'/>);
    fetchReport.calledOnce.should.be.false();

    unmountComponentSuppressError(instance);
    instance = renderIntoDocument(<Report fetchReport={ fetchReport }/>);
    fetchReport.calledOnce.should.be.false();

    unmountComponentSuppressError(instance);
    instance = renderIntoDocument(<Report fetchReport={ fetchReport } reportId={ 1 } fields={ { a: 'b' } }/>);
    fetchReport.calledOnce.should.be.false();
  });
});
