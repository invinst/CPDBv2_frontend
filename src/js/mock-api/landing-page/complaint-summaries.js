import { RawComplaintSummaryFactory } from 'utils/test/factories/complaint';


export default () => [
  RawComplaintSummaryFactory.build({
    'crid': '654321',
    'incident_date': '2000-01-01',
    'category_names': ['Criminal Misconduct'],
  }),
  ...RawComplaintSummaryFactory.buildList(19),
];
