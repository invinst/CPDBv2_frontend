import { compact, get, sumBy, map, last } from 'lodash';
import { extractPercentile } from 'selectors/landing-page/common';

import { getThisYear, formatDate } from 'utils/date';
import roundPercentile from 'utils/round-percentile';


const mappingRace = (race) => {
  if (race.indexOf('Black') !== -1) {
    return 'Black';
  } else if (race.indexOf('Spanish') !== -1) {
    return 'Hispanic';
  }
  return race;
};


const previewPaneTypeMap = {
  OFFICER: (suggestion) => ({
    type: 'OFFICER',
    data: get(searchResultTransformMap, 'OFFICER', () => {
    })(suggestion)
  }),
  COMMUNITY: (suggestion) => ({
    type: 'COMMUNITY',
    data: get(searchResultTransformMap, 'COMMUNITY', () => {
    })(suggestion)
  }),
  NEIGHBORHOOD: (suggestion) => ({
    type: 'NEIGHBORHOOD',
    data: get(searchResultTransformMap, 'NEIGHBORHOOD', () => {
    })(suggestion)
  })
};

export const previewPaneTransform = item =>
  get(previewPaneTypeMap, item.type, () => ({}))(item);

const areaTransform = ({ payload }) => {
  const population = sumBy(payload['race_count'], 'count');
  return {
    name: payload['name'] || 'Unknown',
    allegationCount: payload['allegation_count'] || [],
    mostCommonComplaint: payload['most_common_complaint'] || [],
    officersMostComplaint: payload['officers_most_complaint'] || [],
    population: population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    medianIncome: payload['median_income'],
    url: payload['url'],
    raceCount: map(payload['race_count'], (item) => {
      let result = { race: mappingRace(item.race) };
      result['count'] = population ? item['count'] / population * 100 : 0;
      result['count'] = `${result['count'].toFixed(1)}%`;
      return result;
    })
  };
};

const searchResultTransformMap = {
  OFFICER: ({ payload }) => {
    const currentYear = getThisYear();
    const age = payload['birth_year'] ? `${currentYear - payload['birth_year']} year old` : null;
    const race = payload['race'] === 'Unknown' ? null : payload['race'];
    const sex = payload['sex'] ? payload['sex'] : null;
    const demographicInfo = compact([age, race, sex]).join(', ');
    const lastPercentile = last(payload['percentiles']);
    const percentiles = map(payload['percentiles'], (percentile) => extractPercentile(percentile));
    return {
      fullName: payload['name'],
      birthYear: payload['birth_year'],
      appointedDate: formatDate(payload['appointed_date']),
      badge: payload['badge'],
      complaintCount: payload['allegation_count'],
      complaintPercentile: roundPercentile(get(lastPercentile, 'percentile_allegation'), true),
      civilianComplimentCount: payload['civilian_compliment_count'],
      gender: payload['gender'],
      name: payload['name'],
      lastPercentile: last(percentiles),
      race: payload['race'],
      rank: payload['rank'],
      resignationDate: formatDate(payload['resignation_date']),
      sustainedCount: payload['sustained_count'],
      disciplineCount: payload['discipline_count'],
      to: payload['to'],
      url: payload['url'],
      unit: payload['unit'],
      text: payload['name'],
      trrCount: payload['trr_count'],
      trrPercentile: roundPercentile(get(lastPercentile, 'percentile_trr'), true),
      honorableMentionCount: payload['honorable_mention_count'],
      demographicInfo,
    };
  },
  CR: ({ payload }) => {
    return {
      subText: `CRID ${payload.crid}, ${payload.outcome}`
    };
  },
  COMMUNITY: areaTransform,
  NEIGHBORHOOD: areaTransform,
};

export const searchResultItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  text: get(item, 'payload.result_text'),
  to: get(item, 'payload.to'),
  url: get(item, 'payload.url'),
  tags: get(item, 'payload.tags', []),
  uniqueKey: `${item.type}-${item.id}`,
  itemIndex: item.itemIndex || 1,
  ...get(searchResultTransformMap, item.type, () => {
  })(item)
});

export const navigationItemTransform = item => ({
  type: item.type,
  id: item.id,
  text: get(item, 'payload.result_text'),
  uniqueKey: get(item, 'uniqueKey', `${item.type}-${item.id}`),
  to: get(item, 'payload.to'),
  url: get(item, 'payload.url'),
});
