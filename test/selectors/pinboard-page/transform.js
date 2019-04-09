import {
  relevantDocumentTransform,
  relevantCoaccusalTransform,
  relevantComplaintTransform,
} from 'selectors/pinboard-page/transform';


describe('Pinboard Page transform selectors', function () {
  describe('relevantDocumentTransform', function () {
    it('should format document correctly', function () {
      const document = {
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
      };

      relevantDocumentTransform(document, []).should.eql({
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
      });
    });

    it('should set pinned to true if crid in crids', function () {
      const document = {
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': {
          'crid': '1074534',
          'category': 'Unknown',
          'incident_date': '2015-04-04',
          'officers': []
        }
      };

      relevantDocumentTransform(document, ['1074534', '1074535']).should.eql({
        previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        allegation: {
          crid: '1074534',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          officers: [],
        },
        pinned: true,
      });
    });
  });

  describe('relevantCoaccusalTransform', function () {
    it('should format coaccusal correctly', function () {
      const coaccusal = {
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'percentile': {
          'year': 2006,
          'percentile_trr': '0.0000',
          'percentile_allegation': '88.9038',
          'percentile_allegation_civilian': '49.4652',
          'percentile_allegation_internal': '85.8654'
        }
      };

      relevantCoaccusalTransform(coaccusal).should.eql({
        id: 21992,
        rank: 'Police Officer',
        fullName: 'Johnny Patterson',
        coaccusalCount: 24,
        percentile: {
          year: 2006,
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 85.8654 },
            { axis: 'Civilian Allegations', value: 49.4652 }
          ],
          visualTokenBackground: '#f9946b',
          textColor: '#231F20',
        }
      });
    });
  });

  describe('relevantComplaintTransform', function () {
    it('should format coaccusal correctly', function () {
      const complaint = {
        'crid': '1085121',
        'category': 'Money / Property',
        'incident_date': '2017-04-04',
        'officers': [{
          'id': 21098,
          'rank': 'Sergeant of Police',
          'full_name': 'Daniel O Toole',
          'coaccusal_count': null,
          'percentile': {
            'year': 2016,
            'percentile_trr': '83.0024',
            'percentile_allegation': '99.2282',
            'percentile_allegation_civilian': '99.1579',
            'percentile_allegation_internal': '70.0568'
          }
        }],
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 }
      };

      relevantComplaintTransform(complaint).should.eql({
        crid: '1085121',
        category: 'Money / Property',
        incidentDate: 'Apr 4, 2017',
        point: { 'lon': -87.6427175, 'lat': 41.7756769 },
        officers: [{
          id: 21098,
          fullName: 'Daniel O Toole',
          shortName: 'D. Toole',
          percentile: {
            year: 2016,
            items: [
              { axis: 'Use of Force Reports', value: 83.0024 },
              { axis: 'Officer Allegations', value: 70.0568 },
              { axis: 'Civilian Allegations', value: 99.1579 }
            ],
            visualTokenBackground: '#f52524',
            textColor: '#DFDFDF',
          },
        }],
      });
    });
  });
});
