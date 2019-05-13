import {
  relevantDocumentsSelector,
  relevantDocumentsNextParamsSelector,
  relevantDocumentsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-documents';


describe('RelevantDocuments selectors', function () {
  describe('relevantDocumentsSelector', function () {
    it('should return documents data correctly', function () {
      const documents = [{
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': {
          'crid': '1074534',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': [{
            'id': 31859,
            'rank': 'Sergeant of Police',
            'full_name': 'Eric Cato',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '72.1094',
              'percentile_allegation': '99.4803',
              'percentile_allegation_civilian': '99.1379',
              'percentile_allegation_internal': '88.3297'
            }
          }, {
            'id': 32020,
            'rank': 'Police Officer',
            'full_name': 'Scott Hall',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '78.2707',
              'percentile_allegation': '98.7238',
              'percentile_allegation_civilian': '97.8772',
              'percentile_allegation_internal': '61.1521'
            }
          }]
        }
      },
      {
        'id': 2289,
        'preview_image_url': null,
        'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
        'allegation': {
          'crid': '1074535',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': []
        }
      }];
      const state = {
        pinboard: {
          'officer_ids': [],
          crids: ['1074535'],
          'trr_ids': [],
        },
        pinboardPage: {
          relevantDocuments: {
            items: documents,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
              previous: null
            },
          }
        }
      };

      relevantDocumentsSelector(state).should.eql([{
        previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        allegation: {
          crid: '1074534',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          officers: [{
            id: 31859,
            fullName: 'Eric Cato',
            shortName: 'E. Cato',
            percentile: {
              year: 2016,
              items: [
                { axis: 'Use of Force Reports', value: 72.1094 },
                { axis: 'Officer Allegations', value: 88.3297 },
                { axis: 'Civilian Allegations', value: 99.1379 }
              ],
              visualTokenBackground: '#f0201e',
              textColor: '#DFDFDF',
            },
          }, {
            id: 32020,
            fullName: 'Scott Hall',
            shortName: 'S. Hall',
            percentile: {
              year: 2016,
              items: [
                { axis: 'Use of Force Reports', value: 78.2707 },
                { axis: 'Officer Allegations', value: 61.1521 },
                { axis: 'Civilian Allegations', value: 97.8772 }
              ],
              visualTokenBackground: '#f0201e',
              textColor: '#DFDFDF',
            }
          }],
        },
        pinned: false,
      },
      {
        previewImageUrl: null,
        url: 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
        allegation: {
          crid: '1074535',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          officers: [],
        },
        pinned: true,
      }]);
    });
  });

  describe('relevantDocumentsNextParamsSelector', function () {
    it('should return next request params', function () {
      const state = {
        pinboardPage: {
          relevantDocuments: {
            items: [],
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-documents/?limit=10&offset=20',
              previous: '/pinboards/66ef1560/relevant-documents/?',
            },
          }
        }
      };

      relevantDocumentsNextParamsSelector(state).should.eql({ limit: '10', offset: '20' });
    });
  });

  describe('relevantDocumentsHasMoreSelector', function () {
    it('should return true if count is greater than number of current documents', function () {
      const documents = [{
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': {
          'crid': '1074534',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': [{
            'id': 31859,
            'rank': 'Sergeant of Police',
            'full_name': 'Eric Cato',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '72.1094',
              'percentile_allegation': '99.4803',
              'percentile_allegation_civilian': '99.1379',
              'percentile_allegation_internal': '88.3297'
            }
          }, {
            'id': 32020,
            'rank': 'Police Officer',
            'full_name': 'Scott Hall',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '78.2707',
              'percentile_allegation': '98.7238',
              'percentile_allegation_civilian': '97.8772',
              'percentile_allegation_internal': '61.1521'
            }
          }]
        }
      },
      {
        'id': 2289,
        'preview_image_url': null,
        'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
        'allegation': {
          'crid': '1074535',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': []
        }
      }];
      const state = {
        pinboard: {
          'officer_ids': [],
          crids: ['1074535'],
          'trr_ids': [],
        },
        pinboardPage: {
          relevantDocuments: {
            items: documents,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
              previous: null
            },
          }
        }
      };

      relevantDocumentsHasMoreSelector(state).should.be.true();
    });

    it('should return false if count is not greater than number of current documents', function () {
      const documents = [{
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': {
          'crid': '1074534',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': [{
            'id': 31859,
            'rank': 'Sergeant of Police',
            'full_name': 'Eric Cato',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '72.1094',
              'percentile_allegation': '99.4803',
              'percentile_allegation_civilian': '99.1379',
              'percentile_allegation_internal': '88.3297'
            }
          }, {
            'id': 32020,
            'rank': 'Police Officer',
            'full_name': 'Scott Hall',
            'coaccusal_count': null,
            'percentile': {
              'year': 2016,
              'percentile_trr': '78.2707',
              'percentile_allegation': '98.7238',
              'percentile_allegation_civilian': '97.8772',
              'percentile_allegation_internal': '61.1521'
            }
          }]
        }
      },
      {
        'id': 2289,
        'preview_image_url': null,
        'url': 'https://w.soundcloud.com/player/?url=https%3A/s=false&amp;visual=true',
        'allegation': {
          'crid': '1074535',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': []
        }
      }];
      const state = {
        pinboard: {
          'officer_ids': [],
          crids: ['1074535'],
          'trr_ids': [],
        },
        pinboardPage: {
          relevantDocuments: {
            items: documents,
            count: 2,
            pagination: {
              next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=20',
              previous: null
            },
          }
        }
      };

      relevantDocumentsHasMoreSelector(state).should.be.false();
    });
  });
});
