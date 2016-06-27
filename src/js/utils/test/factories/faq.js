import { Factory } from 'rosie';
import { lorem, random } from 'faker';

import ParagraphFactory from './paragraph';


export default new Factory()
  .option('numOfParagraph', () => (random.number({ min: 1, max: 3 })))
  .sequence('id')
  .attr('title', () => (lorem.sentence()))
  .attr('body', ['numOfParagraph'], (numOfParagraph) => (ParagraphFactory.buildList(numOfParagraph)));
