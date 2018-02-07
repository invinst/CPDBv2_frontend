import { Factory } from 'rosie';

import { internet, image, random } from 'faker';

const DocumentFactory = Factory.define('DocumentFactory')
  .attr('title', () => {
    return `CR ${random.number()}`;
  })
  .attr('url', internet.url)
  .attr('previewImageUrl', image.imageUrl);

const RawDocumentFactory = Factory.define('RawDocumentFactory')
  .attr('title', () => (`CR ${random.number()}`))
  .attr('url', internet.url)
  .attr('preview_image_url', image.imageUrl);

export const DocumentCardFactory = Factory.define('DocumentCardFactory')
  .attr('crid', () => `1${random.uuid()}`)
  .attr('latestDocument', () => (DocumentFactory.build()))
  .attr('numDocuments', () => (random.number({ min: 1, max: 10 })));

export const RawDocumentCardFactory = Factory.define('DocumentCardFactory')
  .option('num_card', 2)
  .attr('crid', () => `1${random.uuid()}`)
  .attr('latest_document', ['num_card'], function (numCard) {
    return RawDocumentFactory.buildList(numCard);
  })
  .attr('num_recent_documents', () => (random.number({ min: 1, max: 10 })));
