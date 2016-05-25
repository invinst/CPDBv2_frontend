import { Factory } from 'rosie';
import { lorem } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('question', () => (lorem.sentence()))
  .attr('paragraphs', () => ([lorem.sentences()]));
