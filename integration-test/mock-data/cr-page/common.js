import {
  AttachmentFactory,
  CoaccusedFactory,
  ComplaintFactory,
  InvestigatorFactory,
  PoliceWitnessFactory,
} from '../../../src/js/utils/test/factories/complaint';


export const crPopupData = [
  {
    name: 'accused_officer',
    page: 'cr',
    title: 'Accused Officer',
    text: 'Some accused officer explanation',
  },
  {
    name: 'investigator',
    page: 'cr',
    title: 'Investigator',
    text: 'Some investigator explanation',
  },
  {
    name: 'policeWitness',
    page: 'cr',
    title: 'Police Witness',
    text: 'Some police witness explanation',
  },
];

export const crData = ComplaintFactory.build({
  crid: '1000000',
  coaccused: [
    CoaccusedFactory.build({
      rank: 'Officer',
      'full_name': 'Bernadette Kelly',
      'complaint_count': 43,
      'sustained_count': 1,
      'percentile_allegation': '99.0000',
      'birth_year': 1975,
      race: 'White',
      gender: 'Male',
      category: 'False Arrest',
      'final_outcome': 'Reprimand',
      'final_finding': 'Sustained',
    }),
    ...CoaccusedFactory.buildList(24, { 'final_finding': 'Not Sustained' }),
  ],
  complainants: [
    {
      gender: 'Male',
      race: 'Black',
      age: 53,
    },
  ],
  victims: [
    {
      gender: 'Male',
      race: 'Black',
      age: 53,
    },
  ],
  attachments: [
    AttachmentFactory.build({
      title: 'CR Document',
      url: 'http://cr-document.com',
      'preview_image_url': null,
    }),
    ...AttachmentFactory.buildList(9, { 'preview_image_url': null }),
  ],
  'incident_date': '2003-09-23',
  'start_date': '2003-09-23',
  'end_date': '2004-03-16',
  summary: 'Summary',
  'most_common_category': {
    category: 'Use Of Force',
    'allegation_name': 'Miscellaneous',
  },
  address: '3510 Michigan Ave, Chicago, IL 60653',
  location: 'Police Building',
  beat: '2551',
  involvements: [
    InvestigatorFactory.build({
      'full_name': 'Bernadette Kelly',
      'badge': 'CPD',
      'officer_id': 1,
      'percentile_allegation': '69.8100',
    }),
    InvestigatorFactory.build({
      'full_name': 'Edward May',
      'badge': 'CPD',
      'officer_id': null,
    }),
    PoliceWitnessFactory.build({
      'full_name': 'Raymond Piwinicki',
      'allegation_count': 3,
      'sustained_count': 0,
      'officer_id': 3,
      'percentile_allegation': '99.8100',
    }),
    PoliceWitnessFactory.build({ 'officer_id': 4 }),
  ],
});
