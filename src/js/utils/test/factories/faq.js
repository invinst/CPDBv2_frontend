import { Factory } from 'rosie';

import { PlainTextFieldFactory, MultilineTextFieldFactory } from './field';


export default new Factory()
  .sequence('id')
  .option('question', '')
  .option('answer', '')
  .attr('fields', ['question', 'answer'], (question, answer) => [
    PlainTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
    MultilineTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
  ]);
