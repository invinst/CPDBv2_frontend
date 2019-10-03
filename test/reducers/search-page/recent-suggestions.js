import recentSuggestions from 'reducers/search-page/recent-suggestions';
import { SEARCH_SAVE_TO_RECENT, FETCH_RECENT_SEARCH_ITEMS_SUCCESS } from 'utils/constants';


describe('recent reducer', function () {
  it('should have initial state', function () {
    recentSuggestions(undefined, {}).should.eql([]);
  });

  describe('handle SEARCH_SAVE_TO_RECENT', function () {
    it('with new item', function () {
      recentSuggestions([
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
        { type: 'OFFICER', id: 8563, data: {} },
        { type: 'CR', id: '271236', data: {} },
        { type: 'OFFICER', id: 8564, data: {} },
        { type: 'CR', id: '271237', data: {} },
        { type: 'OFFICER', id: 8565, data: {} },
        { type: 'CR', id: '271238', data: {} },
        { type: 'OFFICER', id: 8566, data: {} },
        { type: 'CR', id: '271239', data: {} },
      ],
      {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'TRR',
          id: 123456,
          data: {
            type: 'TRR',
            id: 123456,
            'force_type': 'Physical Force - Holding',
            'trr_datetime': '2004-02-24',
          },
        },
      }).should.eql([
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
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
        { type: 'OFFICER', id: 8563, data: {} },
        { type: 'CR', id: '271236', data: {} },
        { type: 'OFFICER', id: 8564, data: {} },
        { type: 'CR', id: '271237', data: {} },
        { type: 'OFFICER', id: 8565, data: {} },
        { type: 'CR', id: '271238', data: {} },
        { type: 'OFFICER', id: 8566, data: {} },
      ]);
    });

    it('with item already in the recent list', function () {
      recentSuggestions([
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
        { type: 'OFFICER', id: 8563, data: {} },
        { type: 'CR', id: '271236', data: {} },
        { type: 'OFFICER', id: 8564, data: {} },
        { type: 'CR', id: '271237', data: {} },
        { type: 'OFFICER', id: 8565, data: {} },
        { type: 'CR', id: '271238', data: {} },
        { type: 'CR', id: '271239', data: {} },
        { type: 'OFFICER', id: 8566, data: {} },
      ],
      {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'CR',
          id: '271239',
          data: {
            type: 'CR',
            id: '271239',
            'incident_date': '2004-02-24',
          },
        },
      }).should.eql([
        {
          type: 'CR',
          id: '271239',
          data: {
            type: 'CR',
            id: '271239',
            'incident_date': '2004-02-24',
          },
        },
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
        { type: 'OFFICER', id: 8563, data: {} },
        { type: 'CR', id: '271236', data: {} },
        { type: 'OFFICER', id: 8564, data: {} },
        { type: 'CR', id: '271237', data: {} },
        { type: 'OFFICER', id: 8565, data: {} },
        { type: 'CR', id: '271238', data: {} },
        { type: 'OFFICER', id: 8566, data: {} },
      ]);
    });
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_SUCCESS', function () {
    recentSuggestions(
      [
        {
          type: 'TRR',
          id: 123,
          data: {
            id: 123,
          },
        },
        {
          type: 'CR',
          id: '1088234',
          data: {
            id: '1088234',
          },
        },
        {
          type: 'OFFICER',
          id: 15499,
          data: {
            id: 15499,
          },
        },
        {
          type: 'WARD',
          id: '384',
          data: {
            name: '384',
            'area_type': 'ward',
          },
        },
      ],
      {
        type: FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
        payload: [
          {
            'id': 15499,
            'name': 'Arthur La Pointe',
            'race': 'White',
            'gender': 'Male',
            'allegation_count': 1,
            'sustained_count': 1,
            'birth_year': 1927,
            'type': 'OFFICER',
          },
          {
            'id': '1088234',
            'crid': '1088234',
            'incident_date': '2016-11-30',
            'type': 'CR',
          },
          {
            'id': 123,
            'force_type': 'Physical Force - Holding',
            'trr_datetime': '2004-02-24',
            'type': 'TRR',
          },
        ],
      }
    ).should.eql([
      {
        type: 'TRR',
        id: 123,
        data: {
          'id': 123,
          'force_type': 'Physical Force - Holding',
          'trr_datetime': '2004-02-24',
          'type': 'TRR',
        },
      },
      {
        type: 'CR',
        id: '1088234',
        data: {
          'id': '1088234',
          'crid': '1088234',
          'incident_date': '2016-11-30',
          'type': 'CR',
        },
      },
      {
        type: 'OFFICER',
        id: 15499,
        data: {
          'id': 15499,
          'name': 'Arthur La Pointe',
          'race': 'White',
          'gender': 'Male',
          'allegation_count': 1,
          'sustained_count': 1,
          'birth_year': 1927,
          'type': 'OFFICER',
        },
      },
      {
        type: 'WARD',
        id: '384',
        data: {
          name: '384',
          'area_type': 'ward',
        },
      },
    ]);
  });
});
