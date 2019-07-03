import { Factory } from 'rosie';

import { internet, random, helpers, date, lorem } from 'faker';

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
  .attr('incidentDate', () => (date.past().toString()))
  .attr('category', lorem.words);
