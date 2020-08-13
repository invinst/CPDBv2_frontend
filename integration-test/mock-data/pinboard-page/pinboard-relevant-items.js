import { filter, get, includes, omit } from 'lodash';

import RawRelevantCoaccusalFactory from '../../../src/js/utils/test/factories/pinboard-page/raw-officer';
import { paginationResponse, pinboardData } from './common';
import
RawRelevantDocumentFactory,
{ RawAllegationFactory }
  from '../../../src/js/utils/test/factories/pinboard-page/raw-relevant-document';
import RawRelevantComplaintFactory from '../../../src/js/utils/test/factories/pinboard-page/raw-relevant-complaint';


const generateCoaccusals = paginationResponse('relevant-coaccusals', RawRelevantCoaccusalFactory);
const generateDocuments = paginationResponse('relevant-documents', RawRelevantDocumentFactory);
const generateComplaints = paginationResponse('relevant-complaints', RawRelevantComplaintFactory);

const getFirstRelevantCoaccusals = (pinboardId, count) => {
  const coaccusals = generateCoaccusals(pinboardId, 20, 0, count);
  const fixedCoaccusals = [
    RawRelevantCoaccusalFactory.build({
      'id': 123,
      rank: 'Detective',
      'full_name': 'Richard Sullivan',
      'coaccusal_count': 53,
      'date_of_appt': '2000-01-02',
      'date_of_resignation': '2010-02-03',
      'badge': '456',
      'gender': 'Female',
      'to': '/officer/11/jerome-finnigan/',
      'birth_year': 1950,
      'race': 'Black',
      'unit': {
        'id': 4,
        'unit_name': '004',
        'description': 'District 004',
        'long_unit_name': 'Unit 004',
      },
      'percentile_trr': '11.1100',
      'percentile_allegation': '22.2200',
      'percentile_allegation_civilian': '33.3300',
      'percentile_allegation_internal': '44.4400',
      'allegation_count': 1,
      'civilian_compliment_count': 2,
      'sustained_count': 4,
      'discipline_count': 6,
      'trr_count': 7,
      'major_award_count': 8,
      'honorable_mention_count': 3,
      'honorable_mention_percentile': 88.88,
    }),
    RawRelevantCoaccusalFactory.build({
      'id': 456,
      rank: 'Officer',
      'full_name': 'Baudilio Lopez',
      'coaccusal_count': 47,
    }),
  ];
  coaccusals.results = fixedCoaccusals.concat(coaccusals.results).slice(0, 20);
  return coaccusals;
};

const getFirstRelevantDocuments = (pinboardId, count) => {
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

const getFirstRelevantComplaints = (pinboardId, count) => {
  const complaints = generateComplaints(pinboardId, 20, 0, count);
  const fixedComplaints = [
    RawRelevantComplaintFactory.build({
      'crid': '1071234',
      'category': 'Lockup Procedures',
      'incident_date': '2004-04-23',
      'address': '51XX South WENTWORTH AVE, CHICAGO ILLINOIS 60609',
      'sub_category': 'Prisoners Property',
      'coaccused': [
        RawRelevantCoaccusalFactory.build({
          'id': 123,
          rank: 'Detective',
          'full_name': 'Richard Sullivan',
          'coaccusal_count': 53,
          'percentile_allegation': '22.2200',
          'allegation_count': 33,
        }),
        RawRelevantCoaccusalFactory.build({
          'id': 456,
          rank: 'Officer',
          'full_name': 'Baudilio Lopez',
          'coaccusal_count': 47,
        }),
        ...RawRelevantCoaccusalFactory.buildList(8),
      ],
      'victims': [
        {
          'gender': 'Male',
          'race': 'Black',
        },
        {
          'gender': 'Male',
          'race': 'Black',
        },
      ],
    }),
    RawRelevantComplaintFactory.build({
      'crid': '1079876',
      'category': 'Operations/Personnel Violation',
      'incident_date': '2014-05-02',
      'coaccused': RawRelevantCoaccusalFactory.buildList(10),
    }),
  ];
  complaints.results = fixedComplaints.concat(complaints.results).slice(0, 20);
  return complaints;
};

const filterPinnedOfficers = (coaccusals, currentPinboard={}) => {
  const pinnedOfficerIds = get(currentPinboard, 'officer_ids', []);
  coaccusals.results = filter(coaccusals.results, coaccusal => !includes(pinnedOfficerIds, coaccusal.id));
  return coaccusals;
};

export const filterPinnedComplaints = (complaints, currentPinboard={}) => {
  const pinnedCrids = get(currentPinboard, 'crids', []);
  complaints.results = filter(complaints.results, cr => !includes(pinnedCrids, cr.crid));
  return complaints;
};

const updatedPinboardData = {
  ...pinboardData,
  'officer_ids': [1234, 123],
};

export const pinboardCoaccusalsData = filterPinnedOfficers(getFirstRelevantCoaccusals('abcd5678', 50), pinboardData);
export const pinboardCoaccusalsDataOffset20 = generateCoaccusals('abcd5678', 20, 20, 50);
export const pinboardCoaccusalsDataOffset40 = generateCoaccusals('abcd5678', 20, 40, 50);

export const pinRelevantCoaccusalRequestData = {
  ...omit(pinboardData, ['id']),
  'officer_ids': ['1234', '123'],
  'trr_ids': ['1234'],
};

export const pinRelevantCoaccusalData = {
  ...pinboardData,
  'officer_ids': ['1234', '123'],
  'trr_ids': ['1234'],
};

export const updatedPinboardCoaccusalsData = filterPinnedOfficers(
  getFirstRelevantCoaccusals('abcd5678', 50),
  updatedPinboardData
);

export const pinboardRelevantDocumentsData = getFirstRelevantDocuments('abcd5678', 50);
export const pinboardRelevantDocumentsDataOffset20 = generateDocuments('abcd5678', 20, 20, 50);
export const pinboardRelevantDocumentsDataOffset40 = generateDocuments('abcd5678', 20, 40, 50);

export const pinboardRelevantComplaintsData = filterPinnedComplaints(
  getFirstRelevantComplaints('abcd5678', 50),
  pinboardData
);
export const pinboardRelevantComplaintsDataOffset20 = generateComplaints('abcd5678', 20, 20, 50);
export const pinboardRelevantComplaintsDataOffset40 = generateComplaints('abcd5678', 20, 40, 50);
