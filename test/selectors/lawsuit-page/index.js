import {
  lawsuitSelector
} from 'selectors/lawsuit-page';

describe('Lawsuit selectors', function () {
  describe('lawsuitSelector', function () {
    const state = {
      lawsuitPage: {
        lawsuit: {
          'case_no': '00-L-5230',
          'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
          'address': '200 E. Chicago Ave., Chicago IL',
          'incident_date': '2000-03-16',
          'plaintiffs': [
            {
              'name': 'Sharon Ambielli',
            },
            {
              'name': 'Kevin Vodak',
            },
          ],
          'officers': [
            {
              'percentile_allegation': '59.5430',
              'percentile_trr': '49.1036',
              'percentile_allegation_civilian': '47.6380',
              'percentile_allegation_internal': '0.0000',
              'id': 32218,
              'full_name': 'Joseph Nega',
              'allegation_count': 12,
            },
            {
              'percentile_allegation': '34.6987',
              'percentile_trr': '67.9110',
              'percentile_allegation_civilian': '43.9207',
              'percentile_allegation_internal': '0.0000',
              'id': 32300,
              'full_name': 'Robert Rose',
              'allegation_count': 4,
            },
          ],
          'interactions': [
            'Protest',
          ],
          'services': [
            'On Duty',
          ],
          'misconducts': [
            'Excessive force',
            'Racial epithets',
          ],
          'violences': [
            'Physical Force',
          ],
          'outcomes': [
            'Killed by officer',
          ],
          'payments': [
            {
              'payee': 'Genre Wilson',
              'legal_fees': '2500000000.00',
            },
            {
              'payee': 'Lucy Bells',
              'settlement': '7500.00',
            },
          ],
          'total_payments': {
            'total': '2500007500.00',
            'total_settlement': '7500.00',
            'total_legal_fees': '2500000000.00',
          },
        },
      },
    };

    it('should return correct result', function () {
      lawsuitSelector(state).should.eql(
        {
          'address': '200 E. Chicago Ave., Chicago IL',
          'caseNo': '00-L-5230',
          'incidentDate': '2000-03-16',
          'interactions': ['Protest'],
          'misconducts': [
            'Excessive force',
            'Racial epithets',
          ],
          'officers': [
            {
              'allegationCount': 12,
              'fullName': 'Joseph Nega',
              'id': 32218,
              'radarAxes': [
                {
                  'axis': 'Use of Force Reports',
                  'value': 49.1036,
                },
                {
                  'axis': 'Officer Allegations',
                  'value': 0,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': 47.638,
                },
              ],
              'radarColor': '#FF6453',
              'url': '/officer/32218/joseph-nega/',
            },
            {
              'allegationCount': 4,
              'fullName': 'Robert Rose',
              'id': 32300,
              'radarAxes': [
                {
                  'axis': 'Use of Force Reports',
                  'value': 67.911,
                },
                {
                  'axis': 'Officer Allegations',
                  'value': 0,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': 43.9207,
                },
              ],
              'radarColor': '#F4A298',
              'url': '/officer/32300/robert-rose/',
            },
          ],
          'outcomes': ['Killed by officer'],
          'payments': [
            {
              'legalFees': '2,500,000,000.00',
              'payee': 'Genre Wilson',
              'settlement': '-',
            },
            {
              'legalFees': '-',
              'payee': 'Lucy Bells',
              'settlement': '7,500.00',
            },
          ],
          'plaintiffs': [
            { 'name': 'Sharon Ambielli' },
            { 'name': 'Kevin Vodak' },
          ],
          'services': ['On Duty'],
          'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
          'totalPayments': {
            'total': '2,500,007,500.00',
            'totalLegalFees': '2,500,000,000.00',
            'totalSettlement': '7,500.00',
          },
          'totalPaymentsDisplayShort': '2.50b',
          'violences': ['Physical Force'],
        }
      );
    });
  });
});
