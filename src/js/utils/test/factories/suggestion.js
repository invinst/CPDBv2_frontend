import { Factory } from 'rosie';
import { random, lorem, name, internet, date } from 'faker';

/* istanbul ignore next */
export const RawOfficerSuggestion = Factory.define('RawOfficerSuggestion')
  .option('race', 'White')
  .option('sex', 'Male')
  .option('rank', 'Police Officer')
  .option('resultText', () => `${name.firstName()} ${name.lastName()}`)
  .option('to', '')
  .option('url', '')
  .option('unit', '001')
  .option('tags', [])
  .option('visualTokenBackgroundColor', internet.color)
  .option('birthYear', () => date.between('1950-01-01', '1990-12-31').getFullYear())
  .option('allegationCount', 20)
  .option('sustainedCount', 0)
  .attr('id', () => String(random.number()))
  .attr('text', lorem.words)
  .attr(
    'payload', [
      'race', 'sex', 'rank', 'resultText', 'to', 'unit', 'sustainedCount',
      'visualTokenBackgroundColor', 'birthYear', 'allegationCount', 'url', 'tags'
    ],
    (
      race, sex, rank, resultText, to, unit, sustainedCount,
      visualTokenBackgroundColor, birthYear, allegationCount, url, tags
    ) => ({
      race,
      sex,
      rank,
      tags,
      'sustained_count': sustainedCount,
      'allegation_count': allegationCount,
      'birth_year': birthYear,
      'result_text': resultText,
      to,
      url,
      unit,
      'visual_token_background_color': visualTokenBackgroundColor
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
  .attr('demographicInfo', '35 year old, Male, White')
  .attr('complaintCount', 20)
  .attr('sustainedCount', 0);
