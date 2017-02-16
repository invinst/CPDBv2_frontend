import { Factory } from 'rosie';
import { name, random, internet } from 'faker';


export default Factory.define('officer')
  .sequence('id')
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('allegation_count', () => random.number())
  .attr('v1_url', () => internet.url());
