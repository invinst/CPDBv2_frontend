import { Factory } from 'rosie';
import { lorem, internet } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('name', () => (lorem.sentence()))
  .attr('short_name', () => (internet.url()));
