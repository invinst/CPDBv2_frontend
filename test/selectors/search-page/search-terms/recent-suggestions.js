import {
  recentSuggestionsSelector,
  recentSuggestionIdsSelector,
} from 'selectors/search-page/search-results/recent-suggestions';


describe('RecentSuggestions selector', function () {
  describe('recentSuggestionsSelector', () => {
    it('should return recent suggestions data correctly', () => {
      const state = {
        pinboardPage: {
          pinboard: {
            'officer_ids': [8562],
            crids: ['317'],
            'trr_ids': [123456],
          },
        },
        searchPage: {
          recentSuggestions: [
            {
              type: 'COMMUNITY',
              id: 317,
              data: {
                id: 317,
                type: 'COMMUNITY',
                text: 'Roseland',
                recentText: 'Roseland',
                to: undefined,
                url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
                tags: [],
                uniqueKey: 'COMMUNITY-317',
                name: 'Roseland',
                allegationCount: 12,
                allegationPercentile: 80.1,
              },
            },
            {
              type: 'OFFICER',
              id: 8562,
              data: {
                id: 8562,
                name: 'Jerome Finnigan',
                race: 'White',
                rank: 'Police Officer',
                gender: 'Male',
                'allegation_count': 10,
                'sustained_count': 5,
                'birth_year': 1980,
                type: 'OFFICER',
              },
            },
            {
              type: 'CR',
              id: '271235',
              data: {
                id: '271235',
                crid: '271235',
                'incident_date': '2001-02-10',
                category: 'Lockup Procedures',
                type: 'CR',
              },
            },
            {
              type: 'TRR',
              id: 123456,
              data: {
                type: 'TRR',
                id: 123456,
                'force_type': 'Physical Force - Holding',
                'trr_datetime': '2004-02-24',
              },
            },
          ],
        },
      };
      recentSuggestionsSelector(state).should.be.eql([
        {
          type: 'COMMUNITY',
          id: 317,
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
          uniqueKey: 'COMMUNITY-317',
          text: 'Roseland',
          subText: 'Community',
          recentText: 'Roseland',
          itemRank: undefined,
          showIntroduction: false,
          recentItemData: {
            allegationCount: 12,
            allegationPercentile: 80.1,
            id: 317,
            name: 'Roseland',
            recentText: 'Roseland',
            tags: [],
            text: 'Roseland',
            to: undefined,
            type: 'COMMUNITY',
            uniqueKey: 'COMMUNITY-317',
            url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
          },
        },
        {
          type: 'OFFICER',
          id: 8562,
          to: '/officer/8562/jerome-finnigan/',
          url: undefined,
          uniqueKey: 'OFFICER-8562',
          text: 'Jerome Finnigan',
          recentText: 'Jerome Finnigan',
          itemRank: undefined,
          showIntroduction: true,
          recentItemData: {
            id: 8562,
            name: 'Jerome Finnigan',
            rank: 'Police Officer',
            race: 'White',
            gender: 'Male',
            'allegation_count': 10,
            'sustained_count': 5,
            'birth_year': 1980,
            type: 'OFFICER',
          },
          complaintCount: 10,
          sustainedCount: 5,
          race: 'White',
          gender: 'Male',
          age: '37-year-old',
          fullName: 'Jerome Finnigan',
          rank: 'Police Officer',
          isPinned: true,
        },
        {
          type: 'CR',
          id: '271235',
          to: '/complaint/271235/',
          url: undefined,
          uniqueKey: 'CR-271235',
          text: 'CR # 271235 • February 10, 2001',
          recentText: 'CR # 271235 • February 10, 2001',
          itemRank: undefined,
          incidentDate: 'Feb 10, 2001',
          category: 'Lockup Procedures',
          showIntroduction: false,
          recentItemData: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Lockup Procedures',
            type: 'CR',
          },
          crid: '271235',
          isPinned: false,

        },
        {
          type: 'TRR',
          id: 123456,
          to: '/trr/123456/',
          url: undefined,
          uniqueKey: 'TRR-123456',
          text: 'Physical Force - Holding',
          recentText: 123456,
          itemRank: undefined,
          forceType: 'Physical Force - Holding',
          incidentDate: 'Feb 24, 2004',
          showIntroduction: false,
          recentItemData: {
            type: 'TRR',
            id: 123456,
            'force_type': 'Physical Force - Holding',
            'trr_datetime': '2004-02-24',
          },
          subText: 'TRR # 123456 - February 24, 2004',
          isPinned: true,
        },
      ]);
    });
  });

  describe('recentSuggestionIdsSelector', function () {
    const state = {
      searchPage: {
        recentSuggestions: [
          { type: 'OFFICER', id: 8562, data: {} },
          { type: 'CR', id: '271235', data: {} },
          { type: 'OFFICER', id: 8563, data: {} },
          { type: 'CR', id: '271236', data: {} },
          { type: 'OFFICER', id: 8564, data: {} },
          { type: 'CR', id: '271237', data: {} },
          { type: 'OFFICER', id: 8565, data: {} },
          { type: 'CR', data: {} },
          { type: 'OFFICER', id: 8566, data: {} },
          { type: 'TRR', id: 123, data: {} },
        ],
      },
    };

    it('should return correct recent suggestion ids', function () {
      recentSuggestionIdsSelector(state).should.eql({
        officerIds: [8562, 8563, 8564, 8565, 8566],
        crids: ['271235', '271236', '271237'],
        trrIds: [123],
      });
    });
  });
});
