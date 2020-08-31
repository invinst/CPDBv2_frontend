import { map } from 'lodash';

import { RichTextFieldFactory } from '../../../src/js/utils/test/factories/field';
import { CitySummaryFactory, rawCommunityFactory } from '../../../src/js/utils/test/factories/heat-map';
import {
  RawOfficerCardFactory,
  RawOfficersPairCardFactory,
  RawPairCardOfficerFactory,
} from '../../../src/js/utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from '../../../src/js/utils/test/factories/attachment';
import { RawComplaintSummaryFactory } from '../../../src/js/utils/test/factories/complaint';


const firstOfficer = {
  id: 777,
  'full_name': 'Jerome Finnigan',
  'complaint_count': 10,
  'sustained_count': 5,
  'birth_year': 1963,
  'race': 'White',
  'gender': 'Male',
  'rank': 'Police Officer',
  'percentile_allegation': '99.8190',
};
const secondOfficer = {
  id: 888,
  'full_name': 'Edward May',
  'complaint_count': 10,
  'sustained_count': 5,
  'birth_year': 1963,
  'race': 'White',
  'gender': 'Male',
  'rank': 'Police Officer',
  'percentile_allegation': '99.8190',
};
const officerCards = [
  RawOfficerCardFactory.build(firstOfficer),
  RawOfficerCardFactory.build(secondOfficer),
];
const pairCards = [
  RawOfficersPairCardFactory.build({
    officer1: RawPairCardOfficerFactory.build(firstOfficer),
    officer2: RawPairCardOfficerFactory.build(secondOfficer),
  }),
];

export const landingPageCmsData = {
  fields: [
    RichTextFieldFactory.build({ name: 'navbar_title' }),
    RichTextFieldFactory.build({ name: 'navbar_subtitle' }),
    RichTextFieldFactory.build({ name: 'demo_video_text' }, { blockTexts: ['What is CPDP?'] }),
  ],
  meta: {},
};

export const communityData = {
  type: 'FeatureCollection',
  features: map(
    [
      rawCommunityFactory.build({
        'allegation_count': 5,
        'discipline_count': 2,
        'name': 'Hyde Park',
      }),
      ...rawCommunityFactory.buildList(9),
    ],
    properties => ({ properties })
  ),
};

export const clusterData = { type: 'FeatureCollection', features: [{ 'geometry': [] }] };

export const citySummaryData = CitySummaryFactory.build({
  'start_year': 1988,
  'end_year': 2017,
  'allegation_count': 10,
  'discipline_count': 5,
  'total_lawsuit_settlements': '10000000.00',
});

export const topOfficersByAllegationData = [
  RawOfficerCardFactory.build({
    'id': 123,
    'full_name': 'Edward May',
    'complaint_count': 5,
    'sustained_count': 1,
    'birth_year': 1963,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Commander',
    'percentile_allegation': '99.8100',
    'kind': '',
  }),
  ...RawOfficerCardFactory.buildList(47, { kind: '' }),
];

export const activityGridOfficersData = officerCards.concat(pairCards);

export const listByNewDocumentData = [
  RawDocumentCardFactory.build({
    'crid': '123456',
    'incident_date': '2000-01-01',
    'category': 'Domestic',
  }),
  ...RawDocumentCardFactory.buildList(23),
];

export const complaintSummariesData = [
  RawComplaintSummaryFactory.build({
    'crid': '654321',
    'incident_date': '2000-01-01',
    'category_names': ['Criminal Misconduct'],
  }),
  ...RawComplaintSummaryFactory.buildList(19),
];
