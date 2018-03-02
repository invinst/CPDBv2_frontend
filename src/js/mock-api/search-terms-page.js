import { SearchTermCategory, SearchTermCategoryItem } from 'utils/test/factories/search-terms';

export default () => ([
  SearchTermCategory.build({ name: 'Geography', items: [
    SearchTermCategoryItem.build(
      { name: 'Communities', description: 'Whatever', 'call_to_action_type': 'view_all' }
    ),
    ...SearchTermCategoryItem.buildList(12)]
  }),
  SearchTermCategory.build({ name: 'Officers' }, { numItems: 71 }),
  SearchTermCategory.build({ name: 'Complainants' }, { numItems: 12 })
]);
