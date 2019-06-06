import { focusedItemSelector } from 'selectors/pinboard-page/focused-item';
import { RawOfficerSuggestion } from 'utils/test/factories/suggestion';


describe('focusedItem selectors', function () {
  it('should return correct status', function () {
    const officerItem = RawOfficerSuggestion.build({
      id: '29033',
      name: 'Jerome Turbyville',
      race: 'White',
      sex: 'Male',
      'birth_year': 1969,
      to: '/officer/29033/',
      'allegation_count': 10,
      'sustained_count': 2,
      unit: {
        id: 1,
        'unit_name': '018',
        description: 'District 018',
      },
    });
    const state = {
      pinboardPage: {
        focusedItem: {
          id: '29033',
          type: 'OFFICER',
        },
        officerItems: [
          officerItem
        ],
        crItems: [{
          crid: '1000001',
          'incident_date': '2010-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
          'most_common_category': 'Use Of Force',
        }],
        trrItems: [{
          id: 1,
          'trr_datetime': '2012-01-01',
          category: 'Impact Weapon',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
        relevantComplaints: {
          items: [],
        },
        relevantCoaccusals: {
          items: [],
        },
      }
    };

    focusedItemSelector(state).should.be.eql({
      data: {
        fullName: 'Jerome Turbyville',
        age: 48,
        appointedDate: 'DEC 13, 1999',
        badge: '5922',
        complaintCount: 10,
        complaintPercentile: 93,
        civilianComplimentCount: 4,
        gender: 'Male',
        lastPercentile: {
          year: undefined,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 91 },
            { axis: 'Civilian Allegations', value: 92 }
          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF'
        },
        race: 'White',
        rank: 'Police Officer',
        resignationDate: null,
        sustainedCount: 2,
        disciplineCount: 1,
        honorableMentionCount: 0,
        majorAwardCount: 0,
        honorableMentionPercentile: 10,
        unit: {
          id: 1,
          unitName: '018',
          description: 'District 018',
        },
        trrCount: undefined,
        trrPercentile: 90,
        to: '/officer/29033/',
      },
      type: 'OFFICER',
    });
  });
});
