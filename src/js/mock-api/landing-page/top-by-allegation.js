import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';

export default () => [
  RawOfficerCardFactory.build({
    'id': 123,
    'full_name': 'Edward May',
    'complaint_count': 5,
    'sustained_count': 1,
    'birth_year': 1963,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Commander',
    'kind': '',
  }),
  ...RawOfficerCardFactory.buildList(47, { kind: '' }),
];
