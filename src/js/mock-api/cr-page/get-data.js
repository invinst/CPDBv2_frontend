import { ComplaintFactory, CoaccusedFactory, AttachmentFactory } from 'utils/test/factories/complaint';

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
      'final_outcome': 'Reprimand'
    }),
    ...CoaccusedFactory.buildList(24)
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
      url: 'http://cr-document.com'
    }),
    ...AttachmentFactory.buildList(9)
  ],
  'incident_date': '2003-09-23',
  'start_date': '2003-09-23',
  'end_date': '2004-03-16',
  summary: 'Summary',
  address: '3510 Michigan Ave, Chicago, IL 60653',
  location: 'Police Building',
  beat: '2551'
});
