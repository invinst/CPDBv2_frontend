import { Factory } from 'rosie';
import { name, random, internet } from 'faker';


/* istanbul ignore next */
export default Factory.define('officer')
  .sequence('id')
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('allegation_count', () => random.number())
  .attr('v1_url', () => internet.url());

export const OfficerPercentiles = Factory.define('OfficerPercentiles')
  .sequence('id')
  .attr('trr_percentile', () => (random.number({ min: 0, max: 10000 }) / 100))
  .attr('internal_percentile', () => (random.number({ min: 0, max: 10000 }) / 100))
  .attr('civil_percentile', () => (random.number({ min: 0, max: 10000 }) / 100));
