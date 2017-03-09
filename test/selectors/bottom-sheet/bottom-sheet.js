import should from 'should';

import { contentSelector } from 'selectors/bottom-sheet';
import { BottomSheetContentType } from 'utils/constants';


describe('bottomSheet selector', function () {
  describe('contentSelector', function () {
    it('should return null when bottomSheet has no content', function () {
      should(contentSelector({}, { params: {} })).be.null();
    });

    it('should return report content if content type is REPORT', function () {
      contentSelector({}, { params: { reportId: 1 } }).should.eql({ id: 1, type: BottomSheetContentType.REPORT });
    });

    it('should return faq content if content type is FAQ', function () {
      contentSelector({}, { params: { faqId: 1 } }).should.eql({ id: 1, type: BottomSheetContentType.FAQ });
    });

    it('should return officer content if content type is OFFICER', function () {
      contentSelector({}, { params: { officerId: 1 } }).should.eql({ id: 1, type: BottomSheetContentType.OFFICER });
    });
  });
});
