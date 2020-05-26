import { Factory } from 'rosie';
import { random, name } from 'faker';


/* istanbul ignore next */
export default Factory.define('RawRelevantCoaccusalFactory')
  .sequence('id')
  .attr('rank', 'Officer')
  .attr('full_name', () => `${ name.firstName() } ${ name.lastName() }`)
  .attr('coaccusal_count', () => random.number())
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0));
