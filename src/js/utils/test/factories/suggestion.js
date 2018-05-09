import { Factory } from 'rosie';
import { random, lorem, name, internet, date } from 'faker';

/* istanbul ignore next */
export const RawOfficerSuggestion = Factory.define('RawOfficerSuggestion')
  .option('race', 'White')
  .option('gender', 'Male')
  .option('rank', 'Police Officer')
  .option('resultText', () => `${name.firstName()} ${name.lastName()}`)
  .option('to', '')
  .option('url', '')
  .option('unit', {})
  .option('tags', [])
  .option('visualTokenBackgroundColor', internet.color)
  .option('birthYear', () => date.between('1950-01-01', '1990-12-31').getFullYear())
  .option('allegationCount', 20)
  .option('sustainedCount', 0)
  .attr('id', () => String(random.number()))
  .attr('text', lorem.words)
  .attr(
    'payload', [
      'race', 'gender', 'rank', 'resultText', 'to', 'unit', 'sustainedCount',
      'birthYear', 'allegationCount', 'url', 'tags'
    ],
    (
      race, gender, rank, resultText, to, unit, sustainedCount,
      birthYear, allegationCount, url, tags
    ) => ({
      race,
      gender,
      rank,
      tags,
      'birth_year': birthYear,
      name: resultText,
      'result_text': resultText,
      to,
      url,
      unit,
      'appointed_date': '1999-12-13',
      'resignation_date': null,
      'civilian_compliment_count': 4,
      'sustained_count': sustainedCount,
      'allegation_count': allegationCount,
      'discipline_count': 1,
      badge: '5922',
      percentiles: [{
        'percentile_trr': '90',
        'percentile_allegation_civilian': '92',
        'percentile_allegation': '93',
        'percentile_allegation_internal': '91',
      }]
    }));

/* istanbul ignore next */
export const RawCRSuggestion = Factory.define('RawCRSuggestion')
  .attr('id', () => String(random.number()))
  .option('resultText', lorem.sentence)
  .option('to', '')
  .option('url', '')
  .option('crid', () => String(random.number()))
  .option('outcome', lorem.words)
  .option('tags', [])
  .attr(
    'payload',
    ['resultText', 'to', 'url', 'crid', 'outcome', 'tags'],
    (resultText, to, url, crid, outcome, tags) => ({
      'result_text': resultText,
      to,
      url,
      tags,
      crid,
      outcome
    })
  );

/* istanbul ignore next */
export const RawNeighborhoodSuggestion = Factory.define('RawNeighborhoodSuggestion')
  .attr('id', () => String(random.number()))
  .option('resultText', lorem.words)
  .option('to', '')
  .option('url', '')
  .option('tags', [])
  .attr(
    'payload',
    ['resultText', 'to', 'url', 'tags'],
    (resultText, to, url, tags) => ({
      'result_text': resultText,
      to,
      url,
      tags,
      'officers_most_complaint': [
        { id: 1, count: 2, name: 'Hulk' },
        { id: 2, count: 1, name: 'Peter Parker' },
      ]
    })
  );

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
