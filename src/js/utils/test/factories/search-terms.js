import { Factory } from 'rosie';

import { lorem } from 'faker';

export const SearchTermCategoryItem = Factory.define('SearchTermCategoryItem')
  .attr('name', lorem.words)
  .attr('id', lorem.word);

export const SearchTermCategory = Factory.define('SearchTermCategory')
  .option('numItems', 2)
  .attr('name', lorem.words)
  .attr('items', ['numItems'], numItems => SearchTermCategoryItem.buildList(numItems));
