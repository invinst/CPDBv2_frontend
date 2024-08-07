import { lorem } from 'faker';
import { Factory } from 'rosie';
import { mapValues } from 'lodash';


export const RawContentStateFactory = new Factory()
  .option('blockTexts', [lorem.sentence()])
  .attr('entityMap', {})
  .attr('blocks', ['blockTexts'], (blockTexts) => (
    blockTexts.map(
      text => RawContentBlockFactory.build({ text }))
  )
  );

const RawContentBlockFactory = new Factory()
  .attr('text', '')
  .attr('entityRanges', [])
  .attr('depth', 0)
  .sequence('key', (i) => `key${i}`)
  .attr('type', 'unstyled')
  .attr('inlineStyleRanges', [])
  .attr('data', {});

export const buildEditStateFields = fields => (
  mapValues(fields, (texts, name) => ({
    type: 'rich_text',
    name: name,
    value: RawContentStateFactory.build(
      {}, { blockTexts: texts }
    ),
  }))
);
