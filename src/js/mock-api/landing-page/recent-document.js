import { RawDocumentCardFactory } from 'utils/test/factories/attachment';


export default () => [
  RawDocumentCardFactory.build({
    'crid': '123456',
    'incident_date': '2000-01-01',
    'category': 'Domestic',
  }),
  ...RawDocumentCardFactory.buildList(23),
];
