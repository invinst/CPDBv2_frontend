import {
  ComplaintFactory, CoaccusedFactory, AttachmentFactory, InvestigatorFactory, PoliceWitnessFactory
} from 'utils/test/factories/complaint';

export default () => ComplaintFactory.build({
  crid: '1000000',
  coaccused: [
    CoaccusedFactory.build({
      rank: 'Officer',
      'full_name': 'Ridchard Sullivan',
      'allegation_count': 43,
      'sustained_count': 1,
      'percentile_allegation': 99,
      age: 41,
      race: 'White',
      gender: 'Male',
      category: 'False Arrest',
      'final_outcome': 'Reprimand',
      'final_finding': 'Sustained'
    }),
    ...CoaccusedFactory.buildList(24, { 'final_finding': 'Not Sustained' })
  ],
  complainants: [
    {
      gender: 'Male',
      race: 'Black',
      age: 53
    }
  ],
  victims: [
    {
      gender: 'Male',
      race: 'Black',
      age: 53
    }
  ],
  attachments: [
    AttachmentFactory.build({
      title: 'CR Document',
      url: 'http://cr-document.com',
      'preview_image_url': null
    }),
    ...AttachmentFactory.buildList(9, { 'preview_image_url': null })
  ],
  'incident_date': '2003-09-23',
  'start_date': '2003-09-23',
  'end_date': '2004-03-16',
  summary: 'Summary',
  'most_common_category': {
    category: 'Use Of Force',
    'allegation_name': 'Miscellaneous'
  },
  address: '3510 Michigan Ave, Chicago, IL 60653',
  location: 'Police Building',
  beat: '2551',
  involvements: [
    InvestigatorFactory.build({
      'full_name': 'Lauren Skol',
      'current_rank': 'IPRA investigator',
      'officer_id': 1
    }),
    InvestigatorFactory.build({ 'officer_id': 2 }),
    PoliceWitnessFactory.build({
      'full_name': 'Raymond Piwinicki',
      'allegation_count': 3,
      'sustained_count': 0,
      'officer_id': 3
    }),
    PoliceWitnessFactory.build({ 'officer_id': 4 })
  ]
});
