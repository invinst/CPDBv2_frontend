import {
  isReportBottomSheetPath,
  isOfficerPath,
} from 'utils/bottom-sheet';

describe('bottomSheetUtils', function () {
  describe('#isReportBottomSheetPath', function () {
    it('returns true if path is report bottom sheet', function () {
      isReportBottomSheetPath('/reporting/1').should.be.true();
      isReportBottomSheetPath('/edit/reporting/1').should.be.true();
    });

    it('returns false if path is not report bottom sheet', function () {
      isReportBottomSheetPath('/foo/bar').should.be.false();
      isReportBottomSheetPath('/edit/foo/bar').should.be.false();
    });
  });

  describe('#isOfficerPath', function () {
    it('returns true if path is officer', function () {
      isOfficerPath('/officer/1/').should.be.true();
      isOfficerPath('/officer/2/timeline/').should.be.true();
      isOfficerPath('/edit/officer/2/timeline/').should.be.true();
    });

    it('returns false if path is not officer', function () {
      isOfficerPath('/foo/officer/1/').should.be.false();
      isOfficerPath('/foo/bar').should.be.false();
      isOfficerPath('/officer/').should.be.false();
    });
  });
});
