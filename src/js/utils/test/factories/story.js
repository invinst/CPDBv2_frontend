import { Factory } from 'rosie';
import { lorem, internet, date } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('publicationName', () => (lorem.sentence()))
  .attr('title', () => (lorem.sentence()))
  .attr('date', () => (date.past().toString()))
  .attr('paragraphs', () => ([lorem.sentences()]))
  .attr('imageUrl', () => (internet.url()))
  .attr('isFeatured', () => (false));
