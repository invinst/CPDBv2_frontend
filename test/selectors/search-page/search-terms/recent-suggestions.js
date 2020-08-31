import {
  recentSuggestionsSelector,
  recentSuggestionIdsSelector,
} from 'selectors/search-page/search-results/recent-suggestions';


describe('RecentSuggestions selector', function () {
  describe('recentSuggestionsSelector', () => {
    context('have more than 3 recent items', function () {
      it('should return recent suggestions data correctly', () => {
        const communityItem = {
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
        };
        const officerItem = {
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
        };
        const crItem = {
          type: 'CR',
          id: '271235',
          data: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Lockup Procedures',
            type: 'CR',
          },
        };
        const trrItem = {
          type: 'TRR',
          id: 123456,
          data: {
            type: 'TRR',
            id: 123456,
            'force_type': 'Physical Force - Holding',
            'trr_datetime': '2004-02-24',
          },
        };
        const lawsuitItem = {
          type: 'LAWSUIT',
          id: 25,
          data: {
            type: 'LAWSUIT',
            id: 25,
            'case_no': '00-L-5230',
            'primary_cause': 'Excessive force',
            'summary': 'Lawsuit summary',
            'incident_date': '2016-09-11',
          },
        };
        const expectedCommunityItem = {
          type: 'COMMUNITY',
          id: 317,
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
          uniqueKey: 'COMMUNITY-317',
          text: 'Roseland',
          subText: 'Community',
          recentText: 'Roseland',
          itemRank: undefined,
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
        };
        const expectedOfficerItem = {
          type: 'OFFICER',
          id: 8562,
          to: '/officer/8562/jerome-finnigan/',
          url: undefined,
          uniqueKey: 'OFFICER-8562',
          text: 'Jerome Finnigan',
          recentText: 'Jerome Finnigan',
          itemRank: undefined,
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
        };
        const expectedCrItem = {
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
          recentItemData: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Lockup Procedures',
            type: 'CR',
          },
          crid: '271235',
          isPinned: false,

        };
        const expectedTrrItem = {
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
          recentItemData: {
            type: 'TRR',
            id: 123456,
            'force_type': 'Physical Force - Holding',
            'trr_datetime': '2004-02-24',
          },
          subText: 'TRR # 123456 - February 24, 2004',
          isPinned: true,
        };
        const expectedLawsuitItem = {
          type: 'LAWSUIT',
          id: 25,
          to: '/lawsuit/00-L-5230/',
          url: undefined,
          uniqueKey: 'LAWSUIT-25',
          text: 'Excessive force • September 11, 2016',
          recentText: 'Excessive force • September 11, 2016',
          subText: 'Lawsuit summary',
          itemRank: undefined,
          recentItemData: {
            type: 'LAWSUIT',
            id: 25,
            'case_no': '00-L-5230',
            'primary_cause': 'Excessive force',
            'summary': 'Lawsuit summary',
            'incident_date': '2016-09-11',
          },
        };
        const state = {
          pinboardPage: {
            pinboard: {
              'officer_ids': [8562],
              crids: ['317'],
              'trr_ids': [123456],
              'lawsuit_ids': [25],
            },
          },
          searchPage: {
            recentSuggestions: [communityItem, officerItem, crItem, trrItem, lawsuitItem],
          },
        };
        const introductionNotVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        };
        const introductionVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        };

        recentSuggestionsSelector(introductionNotVisitedState).should.be.eql([
          {
            ...expectedCommunityItem,
            showIntroduction: false,
          },
          {
            ...expectedOfficerItem,
            showIntroduction: false,
          },
          {
            ...expectedCrItem,
            showIntroduction: true,
          },
          {
            ...expectedTrrItem,
            showIntroduction: false,
          },
          {
            ...expectedLawsuitItem,
            showIntroduction: false,
          },
        ]);

        recentSuggestionsSelector(introductionVisitedState).should.be.eql([
          {
            ...expectedCommunityItem,
            showIntroduction: false,
          },
          {
            ...expectedOfficerItem,
            showIntroduction: false,
          },
          {
            ...expectedCrItem,
            showIntroduction: false,
          },
          {
            ...expectedTrrItem,
            showIntroduction: false,
          },
          {
            ...expectedLawsuitItem,
            showIntroduction: false,
          },
        ]);
      });
    });

    context('have less than 3 recent items', function () {
      it('should return recent suggestions data correctly', () => {
        const officerItem = {
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
        };
        const crItem = {
          type: 'CR',
          id: '271235',
          data: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Lockup Procedures',
            type: 'CR',
          },
        };
        const expectedOfficerItem = {
          type: 'OFFICER',
          id: 8562,
          to: '/officer/8562/jerome-finnigan/',
          url: undefined,
          uniqueKey: 'OFFICER-8562',
          text: 'Jerome Finnigan',
          recentText: 'Jerome Finnigan',
          itemRank: undefined,
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
        };
        const expectedCrItem = {
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
          recentItemData: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Lockup Procedures',
            type: 'CR',
          },
          crid: '271235',
          isPinned: false,

        };
        const state = {
          pinboardPage: {
            pinboard: {
              'officer_ids': [8562],
              crids: [],
              'trr_ids': [],
            },
          },
          searchPage: {
            recentSuggestions: [officerItem, crItem],
          },
        };
        const introductionNotVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        };
        const introductionVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        };

        recentSuggestionsSelector(introductionNotVisitedState).should.be.eql([
          {
            ...expectedOfficerItem,
            showIntroduction: false,
          },
          {
            ...expectedCrItem,
            showIntroduction: true,
          },
        ]);

        recentSuggestionsSelector(introductionVisitedState).should.be.eql([
          {
            ...expectedOfficerItem,
            showIntroduction: false,
          },
          {
            ...expectedCrItem,
            showIntroduction: false,
          },
        ]);
      });
    });

    context('all 3 first recent item is unpinnable', function () {
      it('should return recent suggestions data correctly', () => {
        const communityItem317 = {
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
        };
        const communityItem318 = {
          type: 'COMMUNITY',
          id: 318,
          data: {
            id: 318,
            type: 'COMMUNITY',
            text: 'Austin',
            recentText: 'Austin',
            to: undefined,
            url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Austin',
            tags: [],
            uniqueKey: 'COMMUNITY-318',
            name: 'Austin',
            allegationCount: 12,
            allegationPercentile: 80.1,
          },
        };
        const communityItem319 = {
          type: 'COMMUNITY',
          id: 319,
          data: {
            id: 319,
            type: 'COMMUNITY',
            text: 'Loop',
            recentText: 'Loop',
            to: undefined,
            url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Loop',
            tags: [],
            uniqueKey: 'COMMUNITY-319',
            name: 'Loop',
            allegationCount: 12,
            allegationPercentile: 80.1,
          },
        };
        const officerItem = {
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
        };
        const expectedCommunityItem317 = {
          type: 'COMMUNITY',
          id: 317,
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
          uniqueKey: 'COMMUNITY-317',
          text: 'Roseland',
          subText: 'Community',
          recentText: 'Roseland',
          itemRank: undefined,
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
        };
        const expectedCommunityItem318 = {
          type: 'COMMUNITY',
          id: 318,
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Austin',
          uniqueKey: 'COMMUNITY-318',
          text: 'Austin',
          subText: 'Community',
          recentText: 'Austin',
          itemRank: undefined,
          recentItemData: {
            allegationCount: 12,
            allegationPercentile: 80.1,
            id: 318,
            name: 'Austin',
            recentText: 'Austin',
            tags: [],
            text: 'Austin',
            to: undefined,
            type: 'COMMUNITY',
            uniqueKey: 'COMMUNITY-318',
            url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Austin',
          },
        };
        const expectedCommunityItem319 = {
          type: 'COMMUNITY',
          id: 319,
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Loop',
          uniqueKey: 'COMMUNITY-319',
          text: 'Loop',
          subText: 'Community',
          recentText: 'Loop',
          itemRank: undefined,
          recentItemData: {
            allegationCount: 12,
            allegationPercentile: 80.1,
            id: 319,
            name: 'Loop',
            recentText: 'Loop',
            tags: [],
            text: 'Loop',
            to: undefined,
            type: 'COMMUNITY',
            uniqueKey: 'COMMUNITY-319',
            url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Loop',
          },
        };
        const expectedOfficerItem = {
          type: 'OFFICER',
          id: 8562,
          to: '/officer/8562/jerome-finnigan/',
          url: undefined,
          uniqueKey: 'OFFICER-8562',
          text: 'Jerome Finnigan',
          recentText: 'Jerome Finnigan',
          itemRank: undefined,
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
        };
        const state = {
          pinboardPage: {
            pinboard: {
              'officer_ids': [8562],
              crids: [],
              'trr_ids': [],
            },
          },
          searchPage: {
            recentSuggestions: [communityItem317, communityItem318, communityItem319, officerItem],
          },
        };
        const introductionNotVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        };
        const introductionVisitedState = {
          ...state,
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        };

        recentSuggestionsSelector(introductionNotVisitedState).should.be.eql([
          {
            ...expectedCommunityItem317,
            showIntroduction: false,
          },
          {
            ...expectedCommunityItem318,
            showIntroduction: false,
          },
          {
            ...expectedCommunityItem319,
            showIntroduction: false,
          },
          {
            ...expectedOfficerItem,
            showIntroduction: true,
          },
        ]);

        recentSuggestionsSelector(introductionVisitedState).should.be.eql([
          {
            ...expectedCommunityItem317,
            showIntroduction: false,
          },
          {
            ...expectedCommunityItem318,
            showIntroduction: false,
          },
          {
            ...expectedCommunityItem319,
            showIntroduction: false,
          },
          {
            ...expectedOfficerItem,
            showIntroduction: false,
          },
        ]);
      });
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
          { type: 'LAWSUIT', id: 234567, data: {} },
        ],
      },
    };

    it('should return correct recent suggestion ids', function () {
      recentSuggestionIdsSelector(state).should.eql({
        officerIds: [8562, 8563, 8564, 8565, 8566],
        crids: ['271235', '271236', '271237'],
        trrIds: [123],
        lawsuitIds: [234567],
      });
    });
  });
});
