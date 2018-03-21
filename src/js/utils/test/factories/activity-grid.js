import { Factory } from 'rosie';

import { internet, name, random } from 'faker';


const RawOfficerPercentileFactory = Factory.define('OfficerPercentileFactory')
  .sequence('officer_id')
  .attr('year', 2016)
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0));

export const OfficerCardFactory = Factory.define('OfficerCardFactory')
  .sequence('id')
  .attr('fullName', name.findName)
  .attr('complaintCount', random.number)
  .attr('visualTokenBackgroundColor', internet.color)
  .attr('complaintPercentile', () => (random.number({ min: 10, max: 1000 }) / 10.0));

export const RawOfficerCardFactory = Factory.define('RawOfficerCardFactory')
  .sequence('id')
  .attr('full_name', name.findName)
  .attr('complaint_count', random.number)
  .attr('visual_token_background_color', internet.color)
  .attr('complaint_percentile', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile', () => RawOfficerPercentileFactory.build({ year: 2016 }));
