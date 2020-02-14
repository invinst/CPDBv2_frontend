import { Factory } from 'rosie';
import { lorem } from 'faker';

import { RawContentStateFactory } from './draft';


export const FieldFactory = Factory.define('field')
  .attr('name', lorem.word)
  .attr('type', 'string')
  .attr('value', '');

export const StringFieldFactory = Factory.define('stringField')
  .extend('field');

export const RichTextFieldFactory = Factory.define('richTextField')
  .extend('field')
  .option('blockTexts', [lorem.sentence(5)])
  .attr('value', ['blockTexts'], (blockTexts) => RawContentStateFactory.build({}, { blockTexts }))
  .attr('type', 'rich_text');
