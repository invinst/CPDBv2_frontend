import {
  getComplainantsSummaryRequesting,
  hasComplainantsSummarySelector,
  complainantsSummarySelector,
} from 'selectors/pinboard-page/widgets/complainants-summary';


describe('complainantsSummary selectors', function () {
  const complainantsSummaryItems = {
    race: [
      { race: 'Black', percentage: 0.67 },
      { race: 'Other', percentage: 0.14 },
    ],
    gender: [
      { gender: '', percentage: 0.49 },
      { gender: 'M', percentage: 0.47 },
    ],
  };

  const createState = (complainantsSummary={}, complainantsSummaryRequesting=false) => ({
    pinboardPage: {
      widgets: {
        complainantsSummaryRequesting,
        complainantsSummary,
      },
    },
  });

  describe('getComplainantsSummaryRequesting', function () {
    it('should return correct value', function () {
      getComplainantsSummaryRequesting(createState({}, false)).should.be.false();
      getComplainantsSummaryRequesting(createState({}, true)).should.be.true();
    });
  });

  describe('hasComplainantsSummarySelector', function () {
    context('complainantsSummaryRequesting is true', function () {
      it('should return true', function () {
        hasComplainantsSummarySelector(createState({}, false)).should.be.false();
        hasComplainantsSummarySelector(createState({ race: [], gender: [] }, false)).should.be.false();
        hasComplainantsSummarySelector(createState(complainantsSummaryItems, false)).should.be.true();
      });
    });
  });

  describe('complainantsSummarySelector', function () {
    it('should return correct value', function () {
      complainantsSummarySelector(createState({}, false)).should.eql({ race: [], gender: [] });
      complainantsSummarySelector(createState(complainantsSummaryItems, false)).should.eql({
        race: [
          { name: 'Black', percentage: 0.67 },
          { name: 'Other', percentage: 0.14 },
        ],
        gender: [
          { name: 'Unknown', percentage: 0.49 },
          { name: 'M', percentage: 0.47 },
        ],
      });
    });
  });
});
