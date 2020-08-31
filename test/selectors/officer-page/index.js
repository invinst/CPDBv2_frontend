import {
  getOfficerName,
  metricsSelector,
  summarySelector,
  getCurrentTab,
  getEditModeOn,
  getZipFileUrl,
  isOfficerPinnedSelector,
  pinnableOfficerSelector,
} from 'selectors/officer-page';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('officer page selectors', function () {
  let state = {
    officerPage: {},
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

  describe('getEditModeOn', function () {
    it('should return officer name', function () {
      getEditModeOn({
        officerPage: { editModeOn: { a: true } },
      }).should.eql({ a: true });
    });
  });

  describe('getZipFileUrl', function () {
    it('should return empty in case of missing', function () {
      getZipFileUrl({ officerPage: { zipFileUrl: {} } }).should.be.eql('');
      getZipFileUrl({ officerPage: { zipFileUrl: {} } }, true).should.be.eql('');
    });

    it('should return zip file url without docs by default', function () {
      getZipFileUrl({
        officerPage: { zipFileUrl: { withDocs: '', withoutDocs: 'lvh.me/without-docs.zip' } },
      }).should.be.eql('lvh.me/without-docs.zip');
    });

    it('should able to return zip file url with docs', function () {
      getZipFileUrl(
        { officerPage: { zipFileUrl: { withDocs: 'lvh.me/with-docs.zip', withoutDocs: 'lvh.me/without-docs.zip' } } },
        true
      ).should.be.eql('lvh.me/with-docs.zip');
    });
  });

  describe('summarySelector', function () {
    const summary = {
      'unit': {
        'unit_name': 'unit',
        'description': 'description',
      },
      'rank': 'rank',
      'date_of_appt': '2015-09-23',
      'race': 'race',
      'gender': 'Male',
      'badge': 'badge',
      'historic_badges': ['1', '2'],
      'birth_year': 1991,
      'current_salary': 100000,
      'has_unique_name': true,
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
        careerDuration: 'SEP 23, 2015 — Present',
        birthYear: 1991,
        currentSalary: 100000,
        hasUniqueName: true,
      });
    });

    it('should return summary with resignation date in career duration', function () {
      state.officerPage = { summary: { ...summary, 'date_of_resignation': '2016-01-02' } };

      summarySelector(state).careerDuration.should.eql('SEP 23, 2015 — JAN 2, 2016');
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
        'percentile_allegation': '4.0000',
        'percentile_trr': '9.0000',
        'honorable_mention_count': 3,
        'honorable_mention_percentile': '3.0000',
        'sustained_count': 4,
        'discipline_count': 5,
        'trr_count': 7,
        'total_lawsuit_settlements': '10000000.00',
        'major_award_count': 5,
        'percentiles': [
          { 'year': 2015, 'percentile_trr': '8.0000' },
          { 'year': 2016, 'percentile_trr': '9.0000' },
        ],
      };

      state.officerPage = { summary: { a: 'b', ...metrics } };

      metricsSelector(state).should.eql({
        allegationCount: 1,
        allegationPercentile: '4.0000',
        honorableMentionCount: 3,
        honorableMentionPercentile: '3.0000',
        sustainedCount: 4,
        disciplineCount: 5,
        useOfForceCount: 7,
        majorAwardCount: 5,
        useOfForcePercentile: '9.0000',
        totalLawsuitSettlements: '$10.0M',
      });
    });
  });

  describe('getCurrentTab', function () {
    it('should return current tab', function () {
      state.officerPage = {
        currentTab: 'TIMELINE',
      };

      getCurrentTab(state).should.eql('TIMELINE');
    });
  });

  describe('isOfficerPinnedSelector', function () {
    it('should return true if officerId is in pinboardItems', function () {
      const state = {
        officerPage: {
          officerId: '1',
        },
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1', '2', '3'],
          },
        },
      };
      isOfficerPinnedSelector(state).should.be.true();
    });

    it('should return false if officerId is not in pinboardItems', function () {
      const state = {
        officerPage: {
          officerId: '5',
        },
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1', '2', '3'],
          },
        },
      };
      isOfficerPinnedSelector(state).should.be.false();
    });
  });

  describe('pinnableOfficerSelector', function () {
    it('should return correct data', function () {
      state.officerPage = {
        officerId: 739,
        fullName: 'Willie Peoples',
        summary: {
          rank: 'Police Officer',
          'birth_year': 1986,
          race: 'White',
          gender: 'Male',
          'allegation_count': 12,
          'sustained_count': 87,
        },
      };
      pinnableOfficerSelector(state).should.eql({
        age: '31-year-old',
        complaintCount: 12,
        fullName: 'Willie Peoples',
        gender: 'Male',
        id: 739,
        race: 'White',
        rank: 'Police Officer',
        sustainedCount: 87,
        type: PINNED_ITEM_TYPES.OFFICER,
      });
    });
  });
});
