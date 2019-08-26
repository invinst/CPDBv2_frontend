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
  ];
  documents.results = fixedDocuments.concat(documents.results).slice(0, 20);
  return documents;
};

export default generateDocuments;
