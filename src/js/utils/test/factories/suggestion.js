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
  .attr('victims', [])
  .attr('coaccused', [])
  .attr('category', lorem.words)
  .attr('sub_category', lorem.words)
  .attr('address', lorem.words)
  .attr('incident_date', '1999-12-13')
  .attr('highlight', {
    summary: [String(lorem.sentence)]
  });

/* istanbul ignore next */
export const RawTRRSuggestion = Factory.define('RawTRRSuggestion')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('force_type', lorem.words)
  .attr('trr_datetime', '1999-12-13')
  .attr('date', '1999-12-13')
  .attr('officer', null)
  .attr('taser', lorem.words)
  .attr('address', lorem.words)
  .attr('firearm_used', lorem.words);


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
export const RawRankSuggestion = Factory.define('RankSuggestion')
  .attr('name', null, lorem.words)
  .attr('id', ['name'], name => name)
  .attr('active_officers_count', null, () => random.number())
  .attr('officers_most_complaints', null, [
    { id: 1, count: 2, name: 'Hulk' },
    { id: 2, count: 1, name: 'Peter Parker' },
  ]);

/* istanbul ignore next */
export const OfficerSuggestionBase = Factory.define('OfficerSuggestionBase')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`)
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('age', 35)
  .attr('complaintCount', 20)
  .attr('sustainedCount', 0);

/* istanbul ignore next */
export const OfficerSuggestion = Factory.define('OfficerSuggestion')
  .extend('OfficerSuggestionBase')
  .attr('type', 'OFFICER');

/* istanbul ignore next */
export const DateOfficersSuggestion = Factory.define('DateOfficersSuggestion')
  .extend('OfficerSuggestionBase')
  .attr('type', 'DATE > OFFICERS');

/* istanbul ignore next */
export const UnitOfficersSuggestion = Factory.define('UnitOfficersSuggestion')
  .extend('OfficerSuggestionBase')
  .attr('type', 'UNIT > OFFICERS');

export const NavigationItem = Factory.define('NavigationItem')
  .attr('id', () => String(random.number()))
  .attr('type', 'OFFICER')
  .attr('to', '')
  .attr('url', '')
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`);

/* istanbul ignore next */
export const CRSuggestionBase = Factory.define('CRSuggestionBase')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`)
  .attr('category', lorem.words)
  .attr('incidentDate', '1999-12-13');

/* istanbul ignore next */
export const CRSuggestion = Factory.define('CRSuggestion')
  .extend('CRSuggestionBase')
  .attr('type', 'CR');

/* istanbul ignore next */
export const DateCRSuggestion = Factory.define('DateCRSuggestion')
  .extend('CRSuggestionBase')
  .attr('type', 'DATE > CR');

/* istanbul ignore next */
export const InvestigatorCRSuggestion = Factory.define('InvestigatorCRSuggestion')
  .extend('CRSuggestionBase')
  .attr('type', 'INVESTIGATOR > CR');

/* istanbul ignore next */
export const TRRSuggestionBase = Factory.define('TRRSuggestionBase')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('tags', [])
  .attr('uniqueKey', ['type', 'id'], (type, id) => `${type}-${id}`)
  .attr('subText', ['id'], (id) => `TRR # ${id}`);

/* istanbul ignore next */
export const TRRSuggestion = Factory.define('TRRSuggestion')
  .extend('TRRSuggestionBase')
  .attr('type', 'TRR');

/* istanbul ignore next */
export const DateTRRSuggestion = Factory.define('DateTRRSuggestion')
  .extend('TRRSuggestionBase')
  .attr('type', 'DATE > TRR');
