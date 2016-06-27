import { Factory } from 'rosie';
import { lorem, internet, date } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('newspaperName', () => (lorem.sentence()))
  .attr('title', () => (lorem.sentence()))
  .attr('date', () => (date.past()))
  .attr('paragraphs', () => ([lorem.sentences()]))
  .attr('imageUrl', () => (internet.url()));
