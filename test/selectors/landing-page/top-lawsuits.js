import { cardsSelector, hasCards } from 'selectors/landing-page/top-lawsuits';
import { RawTopLawsuitFactory } from 'utils/test/factories/lawsuit';


describe('top-lawsuits selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        topLawsuits: {},
      },
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.topLawsuits.cards = RawTopLawsuitFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should transform correctly', function () {
      state.landingPage.topLawsuits.cards = [{
        'case_no': '00-L-1234',
        'primary_cause': 'Excessive Force/Serious',
        'summary': 'Lopez was wrongfully accused of the murder of Gabriel Solis in the Little Village neighborhood.',
        'incident_date': '2011-11-20',
      }];
      cardsSelector(state)[0].should.deepEqual({
        caseNo: '00-L-1234',
        primaryCause: 'Excessive Force/Serious',
        summary: 'Lopez was wrongfully accused of the murder of Gabriel Solis in the Little Village neighborhood.',
        incidentDate: 'Nov 20, 2011',
      });
    });
  });

  describe('hasCards', function () {
    it('should return true if topLawsuits has data', function () {
      state.landingPage.topLawsuits.cards = RawTopLawsuitFactory.buildList(1);
      hasCards(state).should.be.true();
    });

    it('should return false if topLawsuits does not have data', function () {
      state.landingPage.topLawsuits.cards = [];
      hasCards(state).should.be.false();
    });
  });
});
