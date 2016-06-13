import { Factory } from 'rosie';
import { lorem } from 'faker';


export default new Factory()
  .attr('type', () => ('paragraph'))
  .attr('value', () => (lorem.sentence()));
