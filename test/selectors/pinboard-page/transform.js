import {
  relevantDocumentTransform,
  relevantCoaccusalTransform,
  relevantComplaintTransform,
} from 'selectors/pinboard-page/transform';


describe('Pinboard Page transform selectors', function () {
  describe('relevantDocumentTransform', function () {
    it('should format document correctly', function () {
      const allegation = {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 },
        'coaccused': [{
          'id': 31859,
          'rank': 'Sergeant of Police',
          'full_name': 'Eric Cato',
          'coaccusal_count': null,
          'percentile_trr': '72.1094',
          'percentile_allegation': '99.4803',
          'percentile_allegation_civilian': '99.1379',
          'percentile_allegation_internal': '88.3297',
        }, {
          'id': 32020,
          'rank': 'Police Officer',
          'full_name': 'Scott Hall',
          'coaccusal_count': null,
          'percentile_trr': '78.2707',
          'percentile_allegation': '98.7238',
          'percentile_allegation_civilian': '97.8772',
          'percentile_allegation_internal': '61.1521',
        }],
      };
      const document = {
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': allegation,
      };

      relevantDocumentTransform(document, []).should.eql({
        previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        allegation: {
          crid: '1074534',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          point: { 'lon': -87.6427175, 'lat': 41.7756769 },
          officers: [{
            id: 31859,
            fullName: 'Eric Cato',
            shortName: 'E. Cato',
            percentile: {
              items: [
                { axis: 'Use of Force Reports', value: 72.1094 },
                { axis: 'Officer Allegations', value: 88.3297 },
                { axis: 'Civilian Allegations', value: 99.1379 },
              ],
              visualTokenBackground: '#F52524',
              textColor: '#DFDFDF',
            },
          }, {
            id: 32020,
            fullName: 'Scott Hall',
            shortName: 'S. Hall',
            percentile: {
              items: [
                { axis: 'Use of Force Reports', value: 78.2707 },
                { axis: 'Officer Allegations', value: 61.1521 },
                { axis: 'Civilian Allegations', value: 97.8772 },
              ],
              visualTokenBackground: '#F52524',
              textColor: '#DFDFDF',
            },
          }],
          isPinStatusChanging: false,
          rawData: allegation,
        },
        pinned: false,
      });
    });

    it('should set pinned to true if crid in crids', function () {
      const allegation = {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'point': null,
        'officers': [],
      };
      const document = {
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': allegation,
      };

      relevantDocumentTransform(document, ['1074534', '1074535']).should.eql({
        previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        allegation: {
          crid: '1074534',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          officers: [],
          point: null,
          isPinStatusChanging: false,
          rawData: allegation,
        },
        pinned: true,
      });
    });

    it('should shorten officer name', function () {
      const allegation = {
        'crid': '1074534',
        'category': 'Unknown',
        'incident_date': '2015-04-04',
        'point': null,
        'coaccused': [{
          'id': 31859,
          'rank': 'Sergeant of Police',
          'full_name': 'Short Name',
          'coaccusal_count': null,
        }, {
          'id': 32020,
          'rank': 'Police Officer',
          'full_name': 'Short Three Names',
          'coaccusal_count': null,
        }, {
          'id': 32022,
          'rank': 'Police Officer',
          'full_name': 'Long Three Nameeeeeeee',
          'coaccusal_count': null,
        }, {
          'id': 32024,
          'rank': 'Police Officer',
          'full_name': 'Long LastNameeeeeeeeeeeeeee',
          'coaccusal_count': null,
        }],
      };
      const document = {
        'id': 16316,
        'preview_image_url': 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        'url': 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        'allegation': allegation,
      };

      relevantDocumentTransform(document, []).should.eql({
        previewImageUrl: 'https://www.documentcloud.org/documents/CRID-1074534-TRR-Stegmiller-p1-normal.gif',
        url: 'https://www.documentcloud.org/documents/3037807/CRID-1074534-TRR-Stegmiller.pdf',
        allegation: {
          crid: '1074534',
          category: 'Unknown',
          incidentDate: 'Apr 4, 2015',
          point: null,
          officers: [{
            id: 31859,
            fullName: 'Short Name',
            shortName: 'S. Name',
            percentile: null,
          }, {
            id: 32020,
            fullName: 'Short Three Names',
            shortName: 'S. Three Names',
            percentile: null,
          }, {
            id: 32022,
            fullName: 'Long Three Nameeeeeeee',
            shortName: 'L. Nameeeeeeee',
            percentile: null,
          }, {
            id: 32024,
            fullName: 'Long LastNameeeeeeeeeeeeeee',
            shortName: 'LastNameeeeeeeeeeeeeee',
            percentile: null,
          }],
          isPinStatusChanging: false,
          rawData: allegation,
        },
        pinned: false,
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
        'allegation_count': 42,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654',
      };

      relevantCoaccusalTransform(coaccusal).should.eql({
        id: 21992,
        rank: 'Police Officer',
        fullName: 'Johnny Patterson',
        coaccusalCount: 24,
        complaintCount: 42,
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 85.8654 },
            { axis: 'Civilian Allegations', value: 49.4652 },
          ],
          visualTokenBackground: '#FF412C',
          textColor: '#231F20',
        },
        isPinStatusChanging: false,
        rawData: coaccusal,
      });
    });
  });

  describe('relevantComplaintTransform', function () {
    it('should format complaint correctly', function () {
      const complaint = {
        'crid': '1085121',
        'category': 'Money / Property',
        'incident_date': '2017-04-04',
        'coaccused': [{
          'id': 21098,
          'rank': 'Sergeant of Police',
          'full_name': 'Daniel O Toole',
          'coaccusal_count': null,
          'percentile_trr': '83.0024',
          'percentile_allegation': '99.2282',
          'percentile_allegation_civilian': '99.1579',
          'percentile_allegation_internal': '70.0568',
        }],
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 },
      };

      relevantComplaintTransform(complaint).should.eql({
        crid: '1085121',
        category: 'Money / Property',
        incidentDate: 'Apr 4, 2017',
        point: { 'lon': -87.6427175, 'lat': 41.7756769 },
        officers: [{
          id: 21098,
          fullName: 'Daniel O Toole',
          shortName: 'D. O Toole',
          percentile: {
            items: [
              { axis: 'Use of Force Reports', value: 83.0024 },
              { axis: 'Officer Allegations', value: 70.0568 },
              { axis: 'Civilian Allegations', value: 99.1579 },
            ],
            visualTokenBackground: '#F52524',
            textColor: '#DFDFDF',
          },
        }],
        isPinStatusChanging: false,
        rawData: complaint,
      });
    });
  });
});
