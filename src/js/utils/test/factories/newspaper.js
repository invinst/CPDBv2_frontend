import { Factory } from 'rosie';
import { lorem, internet } from 'faker';


export default new Factory()
  .sequence('id')
  .attr('title', () => (lorem.sentence()))
  .attr('canonical_url', () => (internet.url()));
