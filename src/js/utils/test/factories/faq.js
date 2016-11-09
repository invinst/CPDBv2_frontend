import { Factory } from 'rosie';
import { lorem } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('title', () => (lorem.sentence()))
  .attr('paragraphs', () => ([lorem.sentences()]))
  .attr('question', () => (lorem.sentence()))
  .attr('answer', () => ([lorem.sentence()]));
