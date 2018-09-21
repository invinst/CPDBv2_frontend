import { Factory } from 'rosie';
import { random, lorem, name, date } from 'faker';

/* istanbul ignore next */
export const RawOfficerSuggestion = Factory.define('RawOfficerSuggestion')
  .attr('id', () => String(random.number()))
  .attr('name', () => `${name.firstName()} ${name.lastName()}`)
  .attr('appointed_date', '1999-12-13')
  .attr('resignation_date', null)
  .attr('badge', '5922')
  .attr('gender', 'Male')
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('birth_year', () => date.between('1950-01-01', '1990-12-31').getFullYear())
  .attr('race', 'White')
  .attr('rank', 'Police Officer')
  .attr('unit', {})
  .attr('allegation_count', 20)
  .attr('civilian_compliment_count', 4)
  .attr('sustained_count', 0)
  .attr('discipline_count', 1)
  .attr('major_award_count', 0)
  .attr('honorable_mention_count', 0)
  .attr('honorable_mention_percentile', 10.01)
  .attr('percentiles', [{
    'percentile_trr': '90',
    'percentile_allegation_civilian': '92',
    'percentile_allegation': '93',
    'percentile_allegation_internal': '91',
  }]);

/* istanbul ignore next */
export const RawCRSuggestion = Factory.define('RawCRSuggestion')
  .attr('id', () => String(random.number()))
  .attr('crid', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('category', lorem.words)
  .attr('incident_date', '1999-12-13');

/* istanbul ignore next */
export const RawTRRSuggestion = Factory.define('RawTRRSuggestion')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('force_type', lorem.words)
  .attr('trr_datetime', '1999-12-13');

/* istanbul ignore next */
export const RawNeighborhoodSuggestion = Factory.define('RawNeighborhoodSuggestion')
  .attr('id', () => String(random.number()))
  .attr('name', lorem.words)
  .attr('to', '')
  .attr('url', 'http://lvh.me/url-mediator/session-builder?neighborhood=SomeNeighborhood')
  .attr('tags', [])
  .attr('officers_most_complaint', [
    { id: 1, count: 2, name: 'Hulk' },
    { id: 2, count: 1, name: 'Peter Parker' },
  ]);

/* istanbul ignore next */
export const OfficerSuggestion = Factory.define('OfficerSuggestion')
  .attr('id', () => String(random.number()))
  .attr('type', 'OFFICER')
  .attr('text', lorem.words)
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`)
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('age', 35)
  .attr('complaintCount', 20)
  .attr('sustainedCount', 0);

export const NavigationItem = Factory.define('NavigationItem')
  .attr('id', () => String(random.number()))
  .attr('type', 'OFFICER')
  .attr('to', '')
  .attr('url', '')
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`);
