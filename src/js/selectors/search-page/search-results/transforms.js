import { get, sumBy, map, last } from 'lodash';
import { extractPercentile } from 'selectors/landing-page/common';

import { getCurrentAge, formatDate } from 'utils/date';
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
    const race = payload['race'] === 'Unknown' ? null : payload['race'];
    const lastPercentile = last(payload['percentiles']);
    const percentiles = map(payload['percentiles'], (percentile) => extractPercentile(percentile));
    return {
      fullName: payload['name'],
      appointedDate: formatDate(payload['appointed_date']),
      resignationDate: formatDate(payload['resignation_date']),
      badge: payload['badge'],
      gender: payload['gender'],
      name: payload['name'],
      to: payload['to'],
      age: getCurrentAge(payload['birth_year']),
      race: race,
      rank: payload['rank'],
      unit: {
        id: get(payload['unit'], 'id'),
        unitName: get(payload['unit'], 'unit_name'),
        description: get(payload['unit'], 'description'),
      },
      lastPercentile: last(percentiles),
      complaintCount: payload['allegation_count'],
      complaintPercentile: roundPercentile(get(lastPercentile, 'percentile_allegation'), true),
      civilianComplimentCount: payload['civilian_compliment_count'],
      sustainedCount: payload['sustained_count'],
      disciplineCount: payload['discipline_count'],
      trrCount: payload['trr_count'],
      trrPercentile: roundPercentile(get(lastPercentile, 'percentile_trr'), true),
      honorableMentionCount: payload['honorable_mention_count'],
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
