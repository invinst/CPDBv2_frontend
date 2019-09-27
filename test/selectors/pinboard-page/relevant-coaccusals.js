import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-coaccusals';


describe('RelevantCoaccusals selectors', function () {
  describe('relevantCoaccusalsSelector', function () {
    it('should return coaccusals data correctly', function () {
      const rawCoaccusal1 = {
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'allegation_count': 42,
        'percentile': {
          'year': 2006,
          'percentile_trr': '0.0000',
          'percentile_allegation': '88.9038',
          'percentile_allegation_civilian': '49.4652',
          'percentile_allegation_internal': '85.8654',
        },
      };
      const rawCoaccusal2 = {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'allegation_count': 81,
        'percentile': {
          'year': 2016,
          'percentile_trr': '38.9028',
          'percentile_allegation': '86.0456',
          'percentile_allegation_civilian': '81.8766',
          'percentile_allegation_internal': '88.3297',
        },
      };

      const coaccusals = [rawCoaccusal1, rawCoaccusal2];
      const state = {
        pinboardPage: {
          pinboard: {},
          relevantCoaccusals: {
            items: coaccusals,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
          pinItemFromPreviewPane: {
            type: 'OFFICER',
            id: 2433,
          },
        },
      };

      relevantCoaccusalsSelector(state).should.eql([{
        id: 21992,
        rank: 'Police Officer',
        fullName: 'Johnny Patterson',
        coaccusalCount: 24,
        complaintCount: 42,
        percentile: {
          year: 2006,
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 85.8654 },
            { axis: 'Civilian Allegations', value: 49.4652 },
          ],
          visualTokenBackground: '#f9946b',
          textColor: '#231F20',
        },
        isPinStatusChanging: false,
        recentItemData: rawCoaccusal1,
      }, {
        id: 2433,
        rank: 'Police Officer',
        fullName: 'Darren Borum',
        coaccusalCount: 18,
        complaintCount: 81,
        percentile: {
          year: 2016,
          items: [
            { axis: 'Use of Force Reports', value: 38.9028 },
            { axis: 'Officer Allegations', value: 88.3297 },
            { axis: 'Civilian Allegations', value: 81.8766 },
          ],
          visualTokenBackground: '#f64016',
          textColor: '#231F20',
        },
        isPinStatusChanging: true,
        recentItemData: rawCoaccusal2,
      }]);
    });
  });

  describe('relevantCoaccusalsNextParamsSelector', function () {
    it('should return next request params', function () {
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: [],
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=10&offset=20',
              previous: '/pinboards/66ef1560/relevant-coaccusals/?',
            },
          },
        },
      };

      relevantCoaccusalsNextParamsSelector(state).should.eql({ limit: '10', offset: '20' });
    });
  });

  describe('relevantCoaccusalsHasMoreSelector', function () {
    it('should return true if count is greater than number of current coaccusals', function () {
      const coaccusals = [{
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'percentile': {
          'year': 2006,
          'percentile_trr': '0.0000',
          'percentile_allegation': '88.9038',
          'percentile_allegation_civilian': '49.4652',
          'percentile_allegation_internal': '85.8654',
        },
      },
      {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'percentile': {
          'year': 2016,
          'percentile_trr': '38.9028',
          'percentile_allegation': '86.0456',
          'percentile_allegation_civilian': '81.8766',
          'percentile_allegation_internal': '88.3297',
        },
      }];
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: coaccusals,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantCoaccusalsHasMoreSelector(state).should.be.true();
    });

    it('should return false if count is not greater than number of current coaccusals', function () {
      const coaccusals = [{
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'percentile': {
          'year': 2006,
          'percentile_trr': '0.0000',
          'percentile_allegation': '88.9038',
          'percentile_allegation_civilian': '49.4652',
          'percentile_allegation_internal': '85.8654',
        },
      },
      {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'percentile': {
          'year': 2016,
          'percentile_trr': '38.9028',
          'percentile_allegation': '86.0456',
          'percentile_allegation_civilian': '81.8766',
          'percentile_allegation_internal': '88.3297',
        },
      }];
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: coaccusals,
            count: 2,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantCoaccusalsHasMoreSelector(state).should.be.false();
    });
  });
});
