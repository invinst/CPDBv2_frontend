import { Factory } from 'rosie';
import { internet, name, random, helpers } from 'faker';

import { yearGenerator } from './utils';


export const OfficerCardFactory = Factory.define('OfficerCardFactory')
  .sequence('id')
  .attr('fullName', name.findName)
  .attr('complaintCount', random.number)
  .attr('visualTokenBackgroundColor', internet.color)
  .attr('allegationPercentile', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('kind', '');

export const RawOfficerCardFactory = Factory.define('RawOfficerCardFactory')
  .sequence('id')
  .attr('full_name', name.findName)
  .attr('complaint_count', random.number)
  .attr('sustained_count', random.number)
  .attr('birth_year', yearGenerator)
  .attr('race', helpers.randomize(['Black', 'White', 'Asian']))
  .attr('gender', helpers.randomize(['Male', 'Female']))
  .attr('rank', helpers.randomize(['Sergeant of Police', 'Police Officer', 'Detective']))
  .attr('visual_token_background_color', internet.color)
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('kind', 'single_officer');

/* istanbul ignore next */
export const RawPairCardOfficerFactory = Factory.define('RawPairCardOfficerFactory')
  .sequence('id')
  .attr('birth_year', yearGenerator)
  .attr('full_name', name.findName)
  .attr('gender', helpers.randomize(['Male', 'Female']))
  .attr('race', helpers.randomize(['Black', 'White', 'Asian']))
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0));

/* istanbul ignore next */
export const RawOfficersPairCardFactory = Factory.define('RawOfficersPairCardFactory')
  .attr('kind', 'coaccused_pair')
  .attr('coaccusal_count', () => random.number({ min: 0, max: 50 }))
  .attr('officer1', () => RawPairCardOfficerFactory.build())
  .attr('officer2', () => RawPairCardOfficerFactory.build());
