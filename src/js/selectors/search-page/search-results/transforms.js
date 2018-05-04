import { compact, get, sumBy, map } from 'lodash';

import { getThisYear } from 'utils/date';
import { getSvgUrl } from 'utils/visual-token';


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
  OFFICER: (suggestion) => {
    const { payload, id, text } = suggestion;
    const visualTokenImg = getSvgUrl(id);
    const visualTokenBackgroundColor = payload['visual_token_background_color'];
    const data = {
      officerInfo: {
        unit: payload.unit,
        rank: payload.rank,
        salary: payload.salary,
        race: payload.race,
        sex: payload.sex,
      },
      visualTokenBackgroundColor,
      visualTokenImg,
      text,
      title: text,
      to: payload.to,
    };
    return { type: 'OFFICER', data };
  },
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
      'count': payload.commander['allegation_count']
    } : null
  };
};

const searchResultTransformMap = {
  OFFICER: ({ payload }) => {
    const currentYear = getThisYear();
    const age = payload['birth_year'] ? `${currentYear - payload['birth_year']} year old` : null;
    const race = payload['race'] === 'Unknown' ? null : payload['race'];
    const sex = payload['sex'] ? payload['sex'] : null;
    const demographicInfo = compact([age, race, sex]).join(', ');
    return {
      demographicInfo,
      complaintCount: payload['allegation_count'],
      sustainedCount: payload['sustained_count']
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
