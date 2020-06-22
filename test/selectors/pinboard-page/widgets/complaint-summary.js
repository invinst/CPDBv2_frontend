import {
  getComplaintSummaryRequesting,
  hasComplaintSummarySelector,
  complaintSummarySelector,
} from 'selectors/pinboard-page/widgets/complaint-summary';


describe('complaintSummary selectors', function () {
  const complaintSummaryItems = [
    { category: 'Operation/Personnel Violations', count: 10 },
    { category: null, count: 4 },
  ];

  const createState = (complaintSummary=[], complaintSummaryRequesting=false) => ({
    pinboardPage: {
      widgets: {
        complaintSummaryRequesting,
        complaintSummary,
      },
    },
  });

  describe('getComplaintSummaryRequesting', function () {
    it('should return correct value', function () {
      getComplaintSummaryRequesting(createState([], false)).should.be.false();
      getComplaintSummaryRequesting(createState([], true)).should.be.true();
    });
  });

  describe('hasComplaintSummarySelector', function () {
    context('complaintSummaryRequesting is true', function () {
      it('should return true', function () {
        hasComplaintSummarySelector(createState([], false)).should.be.false();
        hasComplaintSummarySelector(createState(complaintSummaryItems, false)).should.be.true();
      });
    });
  });

  describe('complaintSummarySelector', function () {
    it('should return correct value', function () {
      complaintSummarySelector(createState([], false)).should.eql([]);
      complaintSummarySelector(createState(complaintSummaryItems, false)).should.eql([
        { title: 'Operation/Personnel Violations', count: 10 },
        { title: 'Unknown', count: 4 },
      ]);
    });
  });
});
