import { Factory } from 'rosie';
import { internet } from 'faker';


export default new Factory()
  .attr('results', () => ([]))
  .attr('count', ['results'], (results) => (results.length))
  .attr('next', () => (internet.url()))
  .attr('previous', () => (internet.url()));
