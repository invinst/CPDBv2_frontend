import { Factory } from 'rosie';

import { internet, random, helpers, lorem } from 'faker';
import { dateGenerator } from 'utils/test/factories/utils';

const RawDocumentFactory = Factory.define('RawDocumentFactory')
  .attr('title', () => (`CR ${random.number()}`))
  .attr('url', internet.url)
  .attr('preview_image_url', 'http://via.placeholder.com/133x176');

export const RawDocumentCardFactory = Factory.define('DocumentCardFactory')
  .option('num_card', 2)
  .attr('crid', () => helpers.replaceSymbolWithNumber('107####'))
  .attr('latest_document', ['num_card'], function (numCard) {
    return RawDocumentFactory.buildList(numCard);
  })
  .attr('incident_date', dateGenerator)
  .attr('category', lorem.words);
