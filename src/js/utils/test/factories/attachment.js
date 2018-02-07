import { Factory } from 'rosie';

import { internet, image, random, helpers } from 'faker';

const RawDocumentFactory = Factory.define('RawDocumentFactory')
  .attr('title', () => (`CR ${random.number()}`))
  .attr('url', internet.url)
  .attr('preview_image_url', image.imageUrl);

export const RawDocumentCardFactory = Factory.define('DocumentCardFactory')
  .option('num_card', 2)
  .attr('crid', () => helpers.replaceSymbolWithNumber('107####'))
  .attr('latest_document', ['num_card'], function (numCard) {
    return RawDocumentFactory.buildList(numCard);
  })
  .attr('num_recent_documents', () => (random.number({ min: 1, max: 10 })));
