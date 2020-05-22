import { random } from 'faker';
import moment from 'moment-timezone';

import {
  allPinboardsSelector,
  hasMoreSelector,
  nextParamsSelector,
  getAllPinboards,
  getIsLoading,
} from 'selectors/pinboard-admin-page';


describe('pinboardAdminPages selectors', function () {
  describe('getAllPinboards', function () {
    it('should return all raw pinboards', function () {
      const isLoading = random.boolean();
      const state = {
        pinboardAdminPage: {
          isLoading,
          allPinboards: {
            items: [
              {
                id: '18a5b091',
                title: '',
                description: '',
                'created_at': '2019-11-04T09:12:20.798703Z',
                'officers_count': 1,
                'allegations_count': 2,
                'trrs_count': 3,
                'officers': [
                  {
                    'percentile_allegation': '44.8403',
                    year: 1993,
                    id: 5200,
                    name: 'Thomas Connor',
                    count: 2,
                  },
                ],
                'allegations': [
                  {
                    crid: 'C201453',
                    category: 'Use Of Force',
                    'incident_date': '1993-05-19',
                  },
                  {
                    crid: '1016583',
                    category: 'Illegal Search',
                    'incident_date': '2008-05-14',
                  },
                ],
                'trrs': [
                  {
                    id: 121,
                    'trr_datetime': '2004-02-23',
                    category: 'Other Force',
                  },
                  {
                    id: 122,
                    'trr_datetime': '2004-02-24',
                    category: 'Physical Force - Holding',
                  },
                  {
                    id: 123,
                    'trr_datetime': '2004-02-24',
                    category: 'Physical Force - Holding',
                  },
                ],
              },
              {
                id: 'f0e5eba4',
                title: '',
                description: '',
                'created_at': '2019-11-01T09:36:56.978310Z',
                'officers_count': 1,
                'allegations_count': 0,
                'trrs_count': 0,
                'officers': [
                  {
                    'percentile_allegation': '44.8403',
                    year: 1993,
                    id: 5200,
                    name: 'Thomas Connor',
                    count: 2,
                  },
                ],
                'allegations': [],
                'trrs': [],
              },
            ],
          },
        },
      };

      getAllPinboards(state).should.eql({
        items: [
          {
            id: '18a5b091',
            title: '',
            description: '',
            'created_at': '2019-11-04T09:12:20.798703Z',
            'officers_count': 1,
            'allegations_count': 2,
            'trrs_count': 3,
            'officers': [
              {
                'percentile_allegation': '44.8403',
                year: 1993,
                id: 5200,
                name: 'Thomas Connor',
                count: 2,
              },
            ],
            'allegations': [
              {
                crid: 'C201453',
                category: 'Use Of Force',
                'incident_date': '1993-05-19',
              },
              {
                crid: '1016583',
                category: 'Illegal Search',
                'incident_date': '2008-05-14',
              },
            ],
            'trrs': [
              {
                id: 121,
                'trr_datetime': '2004-02-23',
                category: 'Other Force',
              },
              {
                id: 122,
                'trr_datetime': '2004-02-24',
                category: 'Physical Force - Holding',
              },
              {
                id: 123,
                'trr_datetime': '2004-02-24',
                category: 'Physical Force - Holding',
              },
            ],
          },
          {
            id: 'f0e5eba4',
            title: '',
            description: '',
            'created_at': '2019-11-01T09:36:56.978310Z',
            'officers_count': 1,
            'allegations_count': 0,
            'trrs_count': 0,
            'officers': [
              {
                'percentile_allegation': '44.8403',
                year: 1993,
                id: 5200,
                name: 'Thomas Connor',
                count: 2,
              },
            ],
            'allegations': [],
            'trrs': [],
          },
        ],
      });
    });
  });

  describe('allPinboardsSelector', function () {
    beforeEach(function () {
      moment.tz.setDefault('America/Chicago');
    });

    it('should return all pinboards with correct format', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              {
                id: '18a5b091',
                title: 'My pinboard',
                description: '',
                'created_at': '2019-11-04T09:12:20.798703Z',
                'officers_count': 1,
                'allegations_count': 2,
                'trrs_count': 3,
                'child_pinboard_count': 1,
                'officers': [
                  {
                    'percentile_allegation_civilian': '52',
                    'percentile_trr': '53',
                    'percentile_allegation_internal': '51',
                    'percentile_allegation': '55',
                    year: 1993,
                    id: 5200,
                    name: 'Thomas Connor',
                    count: 2,
                  },
                ],
                'allegations': [
                  {
                    crid: 'C201453',
                    category: 'Use Of Force',
                    'incident_date': '1993-05-19',
                  },
                  {
                    crid: '1016583',
                    category: 'Illegal Search',
                    'incident_date': '2008-05-14',
                  },
                ],
                'trrs': [
                  {
                    id: 121,
                    'trr_datetime': '2004-02-23',
                    category: 'Other Force',
                  },
                  {
                    id: 122,
                    'trr_datetime': '2004-02-24',
                    category: 'Physical Force - Holding',
                  },
                  {
                    id: 123,
                    'trr_datetime': '2004-02-24',
                    category: 'Physical Force - Holding',
                  },
                ],
              },
              {
                id: 'f0e5eba4',
                title: '',
                description: '',
                'created_at': '2019-11-01T09:36:56.978310Z',
                'officers_count': 1,
                'allegations_count': 0,
                'trrs_count': 0,
                'child_pinboard_count': 0,
                'officers': [
                  {
                    'percentile_allegation_civilian': '92',
                    'percentile_trr': '93',
                    'percentile_allegation_internal': '91',
                    'percentile_allegation': '99.9',
                    year: 1993,
                    id: 5200,
                    name: 'Thomas Connor',
                    count: 2,
                  },
                ],
                'allegations': [],
                'trrs': [],
              },
              {
                id: 'f0e5eba7',
                title: '',
                description: '',
                'created_at': '2018-11-01T09:36:56.978310Z',
                'officers_count': 0,
                'allegations_count': 0,
                'trrs_count': 0,
                'child_pinboard_count': 3,
                'officers': [],
                'allegations': [],
                'trrs': [],
              },
            ],
          },
        },
      };

      allPinboardsSelector(state).should.eql([
        {
          id: '11-2019',
          text: 'Nov 2019',
          kind: 'MONTH_SEPARATOR',
        },
        {
          id: '18a5b091',
          title: 'My pinboard',
          description: '',
          createdAt: 'Nov 04',
          fullCreatedAt: 'Nov 4, 2019 3:12 AM',
          pinnedCount: '1 officer, 2 allegations and 3 TRRS',
          officersCount: 1,
          allegationsCount: 2,
          trrsCount: 3,
          childCount: 1,
          recentOfficers: [
            {
              count: 2,
              id: 5200,
              name: 'Thomas Connor',
              radarAxes: [
                { axis: 'Use of Force Reports', value: 53 },
                { axis: 'Officer Allegations', value: 51 },
                { axis: 'Civilian Allegations', value: 52 },
              ],
              radarColor: '#FF6453',
              url: '/officer/5200/thomas-connor/',
            },
          ],
          recentAllegations: [
            {
              id: 'C201453',
              name: 'Use Of Force',
              subText: 'May 19, 1993',
              url: '/complaint/C201453/',
            },
            {
              id: '1016583',
              name: 'Illegal Search',
              subText: 'May 14, 2008',
              url: '/complaint/1016583/',
            },
          ],
          recentTrrs: [
            {
              id: 121,
              name: 'Other Force',
              subText: 'Feb 23, 2004',
              url: '/trr/121/',
            },
            {
              id: 122,
              name: 'Physical Force - Holding',
              subText: 'Feb 24, 2004',
              url: '/trr/122/',
            },
            {
              id: 123,
              name: 'Physical Force - Holding',
              subText: 'Feb 24, 2004',
              url: '/trr/123/',
            },
          ],
          kind: 'PINBOARD',
        },
        {
          id: 'f0e5eba4',
          title: 'Untitled Pinboard',
          description: '',
          createdAt: 'Nov 01',
          fullCreatedAt: 'Nov 1, 2019 4:36 AM',
          pinnedCount: '1 officer, 0 allegations and 0 TRRS',
          officersCount: 1,
          allegationsCount: 0,
          trrsCount: 0,
          childCount: 0,
          recentOfficers: [
            {
              count: 2,
              id: 5200,
              name: 'Thomas Connor',
              radarAxes: [
                { axis: 'Use of Force Reports', value: 93 },
                { axis: 'Officer Allegations', value: 91 },
                { axis: 'Civilian Allegations', value: 92 },
              ],
              radarColor: '#F52524',
              url: '/officer/5200/thomas-connor/',
            },
          ],
          recentAllegations: [],
          recentTrrs: [],
          kind: 'PINBOARD',
        },
        {
          id: '11-2018',
          text: 'Nov 2018',
          kind: 'MONTH_SEPARATOR',
        },
        {
          id: 'f0e5eba7',
          title: 'Untitled Pinboard',
          description: '',
          createdAt: 'Nov 01',
          fullCreatedAt: 'Nov 1, 2018 4:36 AM',
          pinnedCount: '0 officers, 0 allegations and 0 TRRS',
          officersCount: 0,
          allegationsCount: 0,
          trrsCount: 0,
          childCount: 3,
          recentOfficers: [],
          recentAllegations: [],
          recentTrrs: [],
          kind: 'PINBOARD',
        },
      ]);
    });
  });

  describe('getIsLoading', function () {
    it('should return all pinboards loading status', function () {
      const isLoading = random.boolean();
      const state = {
        pinboardAdminPage: {
          isLoading,
        },
      };

      getIsLoading(state).should.eql(isLoading);
    });
  });

  describe('pinboardAdminPages nextParamsSelector', function () {
    it('should extract pagination information from next parameter', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            pagination: {
              next: '/pinboards/all/?limit=20&offset=40',
            },
          },
        },
      };

      nextParamsSelector(state).should.eql({
        limit: '20',
        offset: '40',
      });
    });
  });

  describe('pinboardAdminPages hasMoreSelector', function () {
    it('should return true when not loaded all items', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              { id: 'aaaa1111' },
              { id: 'bbbb2222' },
              { id: 'cccc3333' },
              { id: 'dddd4444' },
              { id: 'eeee5555' },
            ],
            count: 10,
          },
        },
      };

      hasMoreSelector(state).should.be.true();
    });

    it('should return false when already loaded all items', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              { id: 'aaaa1111' },
              { id: 'bbbb2222' },
              { id: 'cccc3333' },
              { id: 'dddd4444' },
              { id: 'eeee5555' },
            ],
            pagination: {
              count: 5,
            },
          },
        },
      };

      hasMoreSelector(state).should.be.false();
    });
  });
});
