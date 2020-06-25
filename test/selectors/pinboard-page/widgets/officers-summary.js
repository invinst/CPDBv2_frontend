import {
  getOfficersSummaryRequesting,
  hasOfficersSummarySelector,
  officersSummarySelector,
} from 'selectors/pinboard-page/widgets/officers-summary';


describe('officersSummary selectors', function () {
  const officersSummaryItems = {
    race: [
      { race: 'Black', percentage: 0.67 },
      { race: 'Other', percentage: 0.14 },
    ],
    gender: [
      { gender: '', percentage: 0.49 },
      { gender: 'M', percentage: 0.47 },
    ],
  };

  const createState = (officersSummary={}, officersSummaryRequesting=false) => ({
    pinboardPage: {
      widgets: {
        officersSummaryRequesting,
        officersSummary,
      },
    },
  });

  describe('getOfficersSummaryRequesting', function () {
    it('should return correct value', function () {
      getOfficersSummaryRequesting(createState({}, false)).should.be.false();
      getOfficersSummaryRequesting(createState({}, true)).should.be.true();
    });
  });

  describe('hasOfficersSummarySelector', function () {
    context('officersSummaryRequesting is true', function () {
      it('should return true', function () {
        hasOfficersSummarySelector(createState({}, false)).should.be.false();
        hasOfficersSummarySelector(createState({ race: [], gender: [] }, false)).should.be.false();
        hasOfficersSummarySelector(createState(officersSummaryItems, false)).should.be.true();
      });
    });
  });

  describe('officersSummarySelector', function () {
    it('should return correct value', function () {
      officersSummarySelector(createState({}, false)).should.eql({ race: [], gender: [] });
      officersSummarySelector(createState(officersSummaryItems, false)).should.eql({
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
