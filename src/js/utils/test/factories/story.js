import { Factory } from 'rosie';
import { lorem, internet, date } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('paper', () => (lorem.sentence()))
  .attr('title', () => (lorem.sentence()))
  .attr('date', () => (date.past()))
  .attr('paragraph', () => ([lorem.sentences()]))
  .attr('imageUrl', () => (internet.url()));
