import {
  officersTransform,
  coaccusedDataTransform,
  officersSelector,
  coaccusedDataSelector,
  getListEvent
} from 'selectors/social-graph-page';


describe('Social Graph page selectors', function () {
  describe('officersTransform', function () {
    it('should return officer correctly', function () {
      const officer = {
        'full_name': 'Jerome Finnigan',
        'id': 111,
      };
      officersTransform(officer).should.eql({
        fullName: 'Jerome Finnigan',
        id: 111,
      });
    });
  });

  describe('coaccusedDataTransform', function () {
    it('should return coaccused datum correctly', function () {
      const coaccusedDatum = {
        'officer_id_1': 123,
        'officer_id_2': 456,
        'incident_date': '1988-10-03T00:00:00Z',
        'accussed_count': 5,
      };
      coaccusedDataTransform(coaccusedDatum).should.eql({
        officerId1: 123,
        officerId2: 456,
        incidentDate: '1988-10-03T00:00:00Z',
        accussedCount: 5,
      });
    });
  });

  describe('officersSelector', function () {
    it('should return officers correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            officers: [
              {
                'full_name': 'Jerome Finnigan',
                'id': 1,
              },
              {
                'full_name': 'Edward May',
                'id': 2
              }
            ]
          }
        }
      };

      officersSelector(state).should.eql([{
        fullName: 'Jerome Finnigan',
        id: 1
      }, {
        fullName: 'Edward May',
        id: 2
      }]);
    });
  });

  describe('coaccusedDataSelector', function () {
    it('should return coaccused data correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            'coaccused_data': [
              {
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03T00:00:00Z',
                'accussed_count': 1,
              },
              {
                'officer_id_1': 3,
                'officer_id_2': 4,
                'incident_date': '1990-10-03T00:00:00Z',
                'accussed_count': 5,
              }
            ]
          }
        }
      };

      coaccusedDataSelector(state).should.eql([{
        officerId1: 1,
        officerId2: 2,
        incidentDate: '1988-10-03T00:00:00Z',
        accussedCount: 1
      }, {
        officerId1: 3,
        officerId2: 4,
        incidentDate: '1990-10-03T00:00:00Z',
        accussedCount: 5
      }]);
    });
  });

  describe('getListEvent', function () {
    it('should return list events correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            'list_event': [
              '1988-10-03 00:00:00+00:00',
              '1989-12-11 00:00:00+00:00',
              '1990-01-09 00:00:00+00:00',
              '1990-12-13 00:00:00+00:00',
              '1991-01-02 00:00:00+00:00',
              '1991-01-06 00:00:00+00:00',
              '1991-01-15 00:00:00+00:00',
              '1991-02-18 00:00:00+00:00',
              '1991-02-20 00:00:00+00:00',
              '1991-03-06 00:00:00+00:00'
            ]
          }
        }
      };

      getListEvent(state).should.eql([
        '1988-10-03 00:00:00+00:00',
        '1989-12-11 00:00:00+00:00',
        '1990-01-09 00:00:00+00:00',
        '1990-12-13 00:00:00+00:00',
        '1991-01-02 00:00:00+00:00',
        '1991-01-06 00:00:00+00:00',
        '1991-01-15 00:00:00+00:00',
        '1991-02-18 00:00:00+00:00',
        '1991-02-20 00:00:00+00:00',
        '1991-03-06 00:00:00+00:00'
      ]);
    });
  });
});
