import { Factory } from 'rosie';
import { random } from 'faker';


export const RawOfficerPercentileFactory = Factory.define('OfficerPercentileFactory')
  .attr('year', 2016)
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0));

export const RawPointFactory = Factory.define('RawPointFactory')
  .attr('lon', () => (random.number({ min: -90, max: -80, precision: 0.0001 })))
  .attr('lat', () => (random.number({ min: 40, max: 50, precision: 0.0001 })));
