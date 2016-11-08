import 'polyfill';

import { lorem } from 'faker';
import { genKey } from 'draft-js';
import { Factory } from 'rosie';


export const RawContentStateFactory = new Factory()
  .option('blockTexts', [lorem.sentence()])
  .attr('entityMap', {})
  .attr('blocks', ['blockTexts'], (blockTexts) => (
    blockTexts.map(
      text => RawContentBlockFactory.build({ text }))
    )
  );

export const RawContentBlockFactory = new Factory()
  .attr('text', () => lorem.sentence())
  .attr('entityRanges', [])
  .attr('depth', 0)
  .attr('key', genKey)
  .attr('type', 'unstyled')
  .attr('inlineStyleRanges', [])
  .attr('data', {});
