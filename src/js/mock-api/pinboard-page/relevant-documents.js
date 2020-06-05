import RawRelevantDocumentFactory, { RawAllegationFactory }
  from 'utils/test/factories/pinboard-page/raw-relevant-document';
import { paginationResponse } from 'mock-api/pinboard-page/common';
import RawRelevantCoaccusalFactory from 'utils/test/factories/pinboard-page/raw-officer';


const generateDocuments = paginationResponse('relevant-documents', RawRelevantDocumentFactory);

export const getFirstRelevantDocuments = (pinboardId, count) => {
  const documents = generateDocuments(pinboardId, 20, 0, count);
  const fixedDocuments = [
    RawRelevantDocumentFactory.build({
      'preview_image_url': 'http://via.placeholder.com/121x157',
      'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
      'allegation': RawAllegationFactory.build({
        'crid': '1071234',
        'category': 'Lockup Procedures',
        'incident_date': '2004-04-23',
        'coaccused': [
          RawRelevantCoaccusalFactory.build({
            'id': 123,
            rank: 'Detective',
            'full_name': 'Richard Sullivan',
            'coaccusal_count': 53,
            'percentile_allegation': '22.2200',
          }),
          RawRelevantCoaccusalFactory.build({
            'id': 456,
            rank: 'Officer',
            'full_name': 'Baudilio Lopez',
            'coaccusal_count': 47,
          }),
          ...RawRelevantCoaccusalFactory.buildList(8),
        ],
      }),
    }),
    RawRelevantDocumentFactory.build({
      'preview_image_url': 'http://via.placeholder.com/121x157',
      'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
      'allegation': RawAllegationFactory.build({
        'crid': '1079876',
        'category': 'Operations/Personnel Violation',
        'incident_date': '2014-05-02',
        'coaccused': RawRelevantCoaccusalFactory.buildList(10),
      }),
    }),
    RawRelevantDocumentFactory.build({
      'preview_image_url': 'http://via.placeholder.com/121x178',
      'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1079899.pdf',
      'allegation': {
        'crid': '1073132',
        'address': '31XX West HARRISON ST, CHICAGO ILLINOIS 60612',
        'category': 'Use Of Force',
        'incident_date': '2014-12-28',
        'victims': [
          {
            'gender': 'Female',
            'race': 'Black',
          },
          {
            'gender': 'Female',
            'race': 'Black',
          },
        ],
        'point': {
          'lon': -87.7053303,
          'lat': 41.8734621,
        },
        'to': '/complaint/1073132/',
        'sub_category': 'Miscellaneous',
        'coaccused': [
          {
            'id': 7771,
            'rank': 'Police Officer',
            'full_name': 'Darryl Edwards',
            'allegation_count': 33,
            'percentile_allegation': '97.6501',
            'percentile_allegation_civilian': '96.9255',
            'percentile_allegation_internal': '95.2661',
            'percentile_trr': '91.2913',
          },
        ],
      },
    }),
  ];
  documents.results = fixedDocuments.concat(documents.results).slice(0, 20);
  return documents;
};

export default generateDocuments;
