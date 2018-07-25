import { SearchTermCategory, SearchTermCategoryItem } from 'utils/test/factories/search-terms';

export default () => ([
  SearchTermCategory.build({ name: 'Geography', items: [
    SearchTermCategoryItem.build(
      {
        name: 'Communities',
        description: 'Whatever [SomeLink](http://www.somelink.cpdp.com)',
        'call_to_action_type': 'view_all',
        id: 'community'
      }
    ),
    ...SearchTermCategoryItem.buildList(12)]
  }),
  SearchTermCategory.build({ name: 'Officers' }, { numItems: 71 }),
  SearchTermCategory.build({ name: 'Complainants' }, { numItems: 12 })
]);
