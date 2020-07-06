import {
  getTRRSummaryRequesting,
  hasTRRSummarySelector,
  trrSummarySelector,
} from 'selectors/pinboard-page/widgets/trr-summary';


describe('trrSummary selectors', function () {
  const trrSummaryItems = [
    { 'force_type': 'Operation/Personnel Violations', 'count': 10 },
    { 'force_type': null, 'count': 4 },
  ];

  const createState = (trrSummary=[], trrSummaryRequesting=false) => ({
    pinboardPage: {
      widgets: {
        trrSummaryRequesting,
        trrSummary,
      },
    },
  });

  describe('getTRRSummaryRequesting', function () {
    it('should return correct value', function () {
      getTRRSummaryRequesting(createState([], false)).should.be.false();
      getTRRSummaryRequesting(createState([], true)).should.be.true();
    });
  });

  describe('hasTRRSummarySelector', function () {
    context('trrSummaryRequesting is true', function () {
      it('should return true', function () {
        hasTRRSummarySelector(createState([], false)).should.be.false();
        hasTRRSummarySelector(createState(trrSummaryItems, false)).should.be.true();
      });
    });
  });

  describe('trrSummarySelector', function () {
    it('should return correct value', function () {
      trrSummarySelector(createState([], false)).should.eql([]);
      trrSummarySelector(createState(trrSummaryItems, false)).should.eql([
        { title: 'Operation/Personnel Violations', count: 10 },
        { title: 'Unknown', count: 4 },
      ]);
    });
  });
});
