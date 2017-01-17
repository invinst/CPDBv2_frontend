import { Factory } from 'rosie';

import { PlainTextFieldFactory, MultilineTextFieldFactory } from './field';


export default Factory.define('FAQFactory')
  .sequence('id')
  .option('question', '')
  .option('answer', '')
  .attr('fields', ['question', 'answer'], (question, answer) => [
    PlainTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
    MultilineTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
  ])
  .sequence('meta', i => ({ 'order': i }));

export const CuratedFAQFactory = Factory.define('curatedFAQFactory')
  .extend('FAQFactory')
  .attr('fields', ['question', 'answer'], (question, answer) => ({
    question: PlainTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
    answer: MultilineTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
  }))
  .sequence('meta', i => ({ 'order': i }));
