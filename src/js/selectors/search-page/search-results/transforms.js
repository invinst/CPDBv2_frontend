import { get, sumBy, map, last } from 'lodash';
import { extractPercentile } from 'selectors/landing-page/common';

import { getCurrentAge, formatDate } from 'utils/date';
import { roundedPercentile } from 'utils/calculations';


const mappingRace = (race) => {
  if (race.indexOf('Black') !== -1) {
    return 'Black';
  } else if (race.indexOf('Spanish') !== -1) {
    return 'Hispanic';
  } else if (race.indexOf('Native') !== -1) {
    return 'Native';
  }
  return race;
};

const areaTypeMap = (areaType) => ({
  [areaType]: (suggestion) => ({
    type: areaType,
    data: get(searchResultTransformMap, areaType, () => {})(suggestion)
  })
});


const previewPaneTypeMap = {
  OFFICER: (suggestion) => ({
    type: 'OFFICER',
    data: get(searchResultTransformMap, 'OFFICER', () => {})(suggestion)
  }),
  'UNIT > OFFICERS': (suggestion) => ({
    type: 'OFFICER',
    data: get(searchResultTransformMap, 'OFFICER', () => {})(suggestion)
  }),
  ...areaTypeMap('COMMUNITY'),
  ...areaTypeMap('NEIGHBORHOOD'),
  ...areaTypeMap('WARD'),
  ...areaTypeMap('POLICE-DISTRICT'),
  ...areaTypeMap('SCHOOL-GROUND'),
  ...areaTypeMap('BEAT'),
};

export const previewPaneTransform = item =>
  get(previewPaneTypeMap, item.type, () => ({}))(item);

const areaTransform = ({ payload }) => {
  const population = sumBy(payload['race_count'], 'count');
  return {
    name: payload['name'] || 'Unknown',
    allegationCount: payload['allegation_count'] || 0,
    mostCommonComplaint: payload['most_common_complaint'] || [],
    officersMostComplaint: payload['officers_most_complaint'] || [],
    population: population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    medianIncome: payload['median_income'],
    url: payload['url'],
    allegationPercentile: payload['allegation_percentile'],
    raceCount: map(payload['race_count'], (item) => {
      let result = { race: mappingRace(item.race) };
      const racePercentile = population ? item['count'] / population * 100 : 0;
      result['count'] = `${racePercentile.toFixed(1)}%`;
      return result;
    }) || [],
    alderman: payload['alderman'],
    districtCommander: payload.commander ? {
      'id': payload.commander['id'],
      'name': payload.commander['full_name'],
      'count': payload.commander['allegation_count'],
      'url': `/officer/${payload.commander['id']}/`,
    } : null,
    policeHQ: payload['police_hq'],
  };
};

const searchResultTransformMap = {
  OFFICER: ({ payload }) => {
    const race = payload['race'] === 'Unknown' ? null : payload['race'];
    const lastPercentile = last(payload['percentiles']);
    return {
      fullName: payload['name'],
      appointedDate: formatDate(payload['appointed_date']),
      resignationDate: formatDate(payload['resignation_date']),
      badge: payload['badge'],
      gender: payload['gender'] || '',
      name: payload['name'],
      to: payload['to'],
      age: getCurrentAge(payload['birth_year']) || null,
      race: race || '',
      rank: payload['rank'],
      unit: {
        id: get(payload['unit'], 'id'),
        unitName: get(payload['unit'], 'unit_name'),
        description: get(payload['unit'], 'description'),
      },
      lastPercentile: extractPercentile(lastPercentile),
      complaintCount: payload['allegation_count'],
      complaintPercentile: roundedPercentile(get(lastPercentile, 'percentile_allegation')),
      civilianComplimentCount: payload['civilian_compliment_count'],
      sustainedCount: payload['sustained_count'],
      disciplineCount: payload['discipline_count'],
      trrCount: get(payload, 'trr_count'),
      trrPercentile: roundedPercentile(get(lastPercentile, 'percentile_trr')),
      majorAwardCount: get(payload, 'major_award_count'),
      honorableMentionCount: get(payload, 'honorable_mention_count'),
      honorableMentionPercentile: roundedPercentile(get(payload, 'honorable_mention_percentile')),
    };
  },
  CR: ({ payload }) => {
    return {
      subText: `CRID ${payload.crid}, ${payload.outcome}`
    };
  },
  COMMUNITY: areaTransform,
  NEIGHBORHOOD: areaTransform,
  WARD: areaTransform,
  'POLICE-DISTRICT': areaTransform,
  BEAT: areaTransform,
  'SCHOOL-GROUND': areaTransform,
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
