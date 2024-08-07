import { Factory } from 'rosie';
import { random, lorem, name } from 'faker';

import { yearGenerator } from './utils';

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
  .attr('birth_year', yearGenerator)
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
  .attr('percentile_trr', '90.0000')
  .attr('percentile_allegation_civilian', '92.0000')
  .attr('percentile_allegation', '93.0000')
  .attr('percentile_allegation_internal', '91.0000');

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
    summary: [String(lorem.sentence)],
  });

/* istanbul ignore next */
export const RawTRRSuggestion = Factory.define('RawTRRSuggestion')
  .attr('id', () => String(random.number()))
  .attr('to', '')
  .attr('url', '')
  .attr('force_type', lorem.words)
  .attr('trr_datetime', '1999-12-13')
  .attr('officer', null)
  .attr('taser', lorem.words)
  .attr('address', lorem.words)
  .attr('firearm_used', lorem.words);

/* istanbul ignore next */
export const RawLawsuitSuggestion = Factory.define('RawLawsuitSuggestion')
  .attr('id', () => String(random.number()))
  .attr('case_no', () => String(random.number()))
  .attr('summary', () => String(lorem.sentence))
  .attr('primary_cause', lorem.words)
  .attr('incident_date', '2000-12-13');

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
    {
      id: 1,
      count: 2,
      name: 'Hulk',
      'percentile_allegation': '99.9751',
      'percentile_trr': '64.3694',
      'percentile_allegation_civilian': '99.9778',
      'percentile_allegation_internal': '99.8056',
    },
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
export const CommunitySuggestion = Factory.define('CommunitySuggestion')
  .attr('name', () => `${name.firstName()}`)
  .attr('area_type', 'community')
  .attr('url', `http://localhost:8001/url-mediator/session-builder?community=${name.firstName()}`)
  .attr('allegation_count', () => random.number())
  .attr('tags', ['community']);

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
