import { Factory } from 'rosie';
import { lorem } from 'faker';

import { RichTextFieldFactory } from './field';


export default Factory.define('FAQFactory')
  .sequence('id')
  .option('question', () => lorem.sentence())
  .option('answer', () => lorem.sentence())
  .option('order', 1)
  .attr('fields', ['question', 'answer'], (question, answer) => [
    RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
    RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
  ])
  .attr('meta', ['order'], order => ({ 'order': order }));

export const CuratedFAQFactory = Factory.define('curatedFAQFactory')
  .extend('FAQFactory')
  .attr('fields', ['question', 'answer'], (question, answer) => ({
    question: RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
    answer: RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
  }))
  .sequence('meta', i => ({ 'order': i }));
