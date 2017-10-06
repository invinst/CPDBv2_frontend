import { Factory } from 'rosie';
import { lorem } from 'faker';

import { RawContentStateFactory } from './draft';


export const FieldFactory = Factory.define('field')
  .attr('name', lorem.word)
  .attr('type', 'string')
  .attr('value', '');

export const StringFieldFactory = Factory.define('stringField')
  .extend('field');

export const DateFieldFactory = Factory.define('dateField')
  .extend('field')
  .attr('type', 'date')
  .attr('value', '2016-11-07');

export const LinkFieldFactory = Factory.define('linkField').extend('field')
  .attr('type', 'link')
  .attr('value', 'http://example.com');

export const DraftFieldFactory = Factory.define('draftFieldFactory')
  .extend('field')
  .option('blockTexts', [lorem.sentence()])
  .attr('value', ['blockTexts'], (blockTexts) => RawContentStateFactory.build({}, { blockTexts }));

export const PlainTextFieldFactory = Factory.define('plainTextField')
  .extend('draftFieldFactory')
  .attr('type', 'plain_text');

export const MultilineTextFieldFactory = Factory.define('multilineTextField')
  .extend('draftFieldFactory')
  .attr('type', 'multiline_text');

export const RichTextFieldFactory = Factory.define('richTextField')
  .extend('draftFieldFactory')
  .attr('type', 'rich_text');

export const RandomizerFieldFactory = Factory.define('randomizerField')
  .extend('field')
  .attr('type', 'randomizer')
  .attr('value', {
    'poolSize': 10,
    'selectedStrategyId': 1,
    'strategies': [{
      'id': 1,
      'name': 'Last entries'
    }, {
      'id': 2,
      'name': 'Last days'
    }]
  });
