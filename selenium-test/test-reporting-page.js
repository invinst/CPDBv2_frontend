'use strict';

require('should');

import reportingPage from './page-objects/reporting-page';


describe('reporting page', function () {
  beforeEach(function () {
    reportingPage.open();
  });

  context('edit mode off', function () {
    it('should have URI "/reporting/"', function () {
      reportingPage.currentBasePath.should.equal('/reporting/');
    });

    it('should show reports', function () {
      reportingPage.reportingSection.report.count.should.equal(20);
    });

    it('should open bottom sheet when click on report item', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible();
    });

    it('should load more when scroll down', function () {
      browser.scroll(0, 1000);
      reportingPage.reportingSection.report.count.should.above(20);
    });
  });

  context('edit mode on', function () {
    beforeEach(function () {
      reportingPage.openEditMode();
    });

    it('should have URI "/edit/reporting/"', function () {
      reportingPage.currentBasePath.should.equal('/edit/reporting/');
    });

    it('should show add button', function () {
      reportingPage.reportingSection.addButton.waitForVisible();
    });

    it('open empty edittable bottom sheet when click on add button', function () {
      reportingPage.reportingSection.addButton.click();
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible();
      reportingPage.isRichTextEditorEmpty(reportingPage.bottomSheet.reportTitle).should.be.true();
      reportingPage.isRichTextEditorEmpty(reportingPage.bottomSheet.reportExcerpt).should.be.true();
      reportingPage.isRichTextEditorEmpty(reportingPage.bottomSheet.reportArticleLink).should.be.true();
    });

    it('open edittable bottom sheet when click on report', function () {
      reportingPage.reportingSection.report.click();
      reportingPage.bottomSheet.reportBottomSheet.waitForVisible();
    });
  });
});
