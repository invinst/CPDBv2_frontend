import {
  DATA_NOT_AVAILABLE,
  getOfficerName,
  getPathname,
  metricsSelector,
  summarySelector,
} from 'selectors/officer-page';


describe('officer page selectors', function () {
  let state = {
    officerPage: {}
  };

  beforeEach(function () {
    state.officerPage = {};
  });

  describe('getOfficerName', function () {
    it('should return officer name', function () {
      const fullName = 'Mr. Foo';
      state.officerPage = { fullName };

      getOfficerName(state).should.eql(fullName);
    });
  });

  describe('summarySelector', function () {
    const summary = {
      'unit': {
        'unit_name': 'unit',
        'description': 'description'
      },
      'rank': 'rank',
      'date_of_appt': '2015-09-23',
      'race': 'race',
      'gender': 'Male',
      'badge': 'badge',
      'historic_badges': ['1', '2'],
      'birth_year': 1991,
    };

    it('should return summary', function () {
      state.officerPage = { summary };

      summarySelector(state).should.eql({
        unitName: 'unit',
        unitDescription: 'description',
        rank: 'rank',
        race: 'race',
        gender: 'Male',
        badge: 'badge',
        historicBadges: ['1', '2'],
        dateOfAppt: '2015-09-23',
        careerDescription: '2 years',
        careerDuration: 'SEP 23, 2015—Present',
        birthYear: 1991
      });
    });

    it('should return summary with resignation date in career duration', function () {
      state.officerPage = { summary: { ...summary, 'date_of_resignation': '2016-01-02' } };

      summarySelector(state).careerDuration.should.eql('SEP 23, 2015—JAN 2, 2016');
    });

    it('should return summary with 1 year in career description', function () {
      state.officerPage = { summary: { ...summary, 'date_of_resignation': '2016-10-23' } };

      summarySelector(state).careerDescription.should.eql('1 year');
    });

    it('should return summary without empty career description', function () {
      state.officerPage = { summary: { ...summary, 'date_of_resignation': '2015-12-23' } };

      summarySelector(state).careerDescription.should.eql('');
    });

    it('should return summary with empty careerDuration if no date_of_appt and date_of_resignation', function () {
      state.officerPage = { summary: { ...summary, 'date_of_appt': '', 'date_of_resignation': '' } };

      summarySelector(state).careerDuration.should.eql('');
    });

    it('should return summary with empty getCareerDescription if there is no date_of_appt', function () {
      state.officerPage = { summary: { ...summary, 'date_of_appt': '' } };

      summarySelector(state).careerDescription.should.eql('');
    });

    it('should return summary with empty rank if summary is an empty object', function () {
      state.officerPage = { summary: {} };

      summarySelector(state).rank.should.eql('');
    });

    it('should return summary with rank N/A if there is no rank', function () {
      state.officerPage = { summary: { ...summary, rank: '' } };

      summarySelector(state).rank.should.eql('N/A');
    });
  });

  describe('metricsSelector', function () {
    it('should return metrics', function () {
      const metrics = {
        'allegation_count': 1,
        'honorable_mention_count': 3,
        'sustained_count': 4,
        'discipline_count': 5,
        'use_of_force_count': 7,
        'top_use_of_force_percentile': 9.0,
        'civilian_compliment_count': 10,
      };

      state.officerPage = { summary: { a: 'b', ...metrics } };

      metricsSelector(state).should.eql({
        allegationCount: 1,
        topAllegationPercentile: DATA_NOT_AVAILABLE,
        honorableMentionCount: 3,
        sustainedCount: 4,
        disciplineCount: 5,
        topHonorableMentionPercentile: DATA_NOT_AVAILABLE,
        useOfForceCount: 7,
        majorAwardCount: DATA_NOT_AVAILABLE,
        topUseOfForcePercentile: 9.0,
        civilianComplimentCount: 10,
      });
    });
  });

  describe('getPathname', function () {
    it('should return pathname', function () {
      const state = {
        officerPage: {
          pathname: '/some/path/'
        }
      };
      getPathname(state).should.eql('/some/path/');
    });
  });
});
