import { get, sumBy, map, last } from 'lodash';
import moment from 'moment/moment';

import { extractPercentile } from 'selectors/common/percentile';
import { getCurrentAge, formatDate } from 'utils/date';
import { roundedPercentile } from 'utils/calculations';
import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';


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

const officerMostComplaintTransform = officer => ({
  id: officer.id,
  count: officer.count,
  name: officer.name,
  url: `/officer/${officer.id}/`,
  radarAxes: [
      { axis: 'trr', value: parseFloat(officer['percentile_trr']) },
      { axis: 'internal', value: parseFloat(officer['percentile_allegation_internal']) },
      { axis: 'civilian', value: parseFloat(officer['percentile_allegation_civilian']) }],
  radarColor: getVisualTokenOIGBackground(
    parseFloat(officer['percentile_allegation_internal']),
    parseFloat(officer['percentile_allegation_civilian']),
    parseFloat(officer['percentile_trr'])
  ),
});

const areaTransform = (item) => {
  const population = sumBy(item['race_count'], 'count');
  const officersMostComplaint = get(item, 'officers_most_complaint', []);
  const transformedOfficersMostComplaint = officersMostComplaint.map(officer => officerMostComplaintTransform(officer));
  return {
    name: item['name'] || 'Unknown',
    allegationCount: item['allegation_count'] || 0,
    mostCommonComplaint: item['most_common_complaint'] || [],
    officersMostComplaint: transformedOfficersMostComplaint,
    population: population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    medianIncome: item['median_income'],
    url: item['url'],
    allegationPercentile: item['allegation_percentile'],
    raceCount: map(item['race_count'], (item) => {
      let result = { race: mappingRace(item.race) };
      const racePercentile = population ? item['count'] / population * 100 : 0;
      result['count'] = `${racePercentile.toFixed(1)}%`;
      return result;
    }) || [],
    alderman: item['alderman'],
    districtCommander: item.commander ? {
      'id': item.commander['id'],
      'name': item.commander['full_name'],
      'count': item.commander['allegation_count'],
      'url': `/officer/${item.commander['id']}/`,
    } : null,
    policeHQ: item['police_hq'],
  };
};

const crTransform = (item) => {
  const dateText = item['incident_date'] ? ` - ${moment(item['incident_date']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    subText: `CR # ${item.crid}${dateText}`
  };
};

const trrTransform = (item) => {
  const dateText = item['trr_datetime'] ? ` - ${moment(item['trr_datetime']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    subText: `TRR # ${item.id}${dateText}`
  };
};

const searchResultTransformMap = {
  'DATE > CR': crTransform,
  'DATE > TRR': trrTransform,
  OFFICER: (item) => {
    const race = item['race'] === 'Unknown' ? null : item['race'];
    const lastPercentile = last(item['percentiles']);
    return {
      fullName: item['name'],
      appointedDate: formatDate(item['appointed_date']),
      resignationDate: formatDate(item['resignation_date']),
      badge: item['badge'],
      gender: item['gender'] || '',
      to: item['to'],
      age: getCurrentAge(item['birth_year']) || null,
      race: race || '',
      rank: item['rank'],
      unit: {
        id: get(item['unit'], 'id'),
        unitName: get(item['unit'], 'unit_name'),
        description: get(item['unit'], 'description'),
      },
      lastPercentile: extractPercentile(lastPercentile),
      complaintCount: item['allegation_count'],
      complaintPercentile: roundedPercentile(get(lastPercentile, 'percentile_allegation')),
      civilianComplimentCount: item['civilian_compliment_count'],
      sustainedCount: item['sustained_count'],
      disciplineCount: item['discipline_count'],
      trrCount: get(item, 'trr_count'),
      trrPercentile: roundedPercentile(get(lastPercentile, 'percentile_trr')),
      majorAwardCount: get(item, 'major_award_count'),
      honorableMentionCount: get(item, 'honorable_mention_count'),
      honorableMentionPercentile: roundedPercentile(get(item, 'honorable_mention_percentile')),
    };
  },
  CR: crTransform,
  TRR: trrTransform,
  COMMUNITY: areaTransform,
  NEIGHBORHOOD: areaTransform,
  WARD: areaTransform,
  'POLICE-DISTRICT': areaTransform,
  BEAT: areaTransform,
  'SCHOOL-GROUND': areaTransform,
};

const getBaseTexts = (item) => ({ text: item.name, recentText: item.name });
const getCRTexts = (item) => ({ text: item.category || 'Unknown', recentText: item.crid });
const getTRRTexts = (item) => ({ text: item['force_type'] || 'Unknown', recentText: item.id });
const getUnitTexts = (item) => {
  const text = item.description || `Unit ${item.name}`;
  return { text, recentText: text };
};

const textsMap = {
  'DATE > CR': getCRTexts,
  'DATE > TRR': getTRRTexts,
  CR: getCRTexts,
  TRR: getTRRTexts,
  UNIT: getUnitTexts
};

const uniqueKeyMap = {
  'DATE > CR': 'DATE-CR',
  'DATE > TRR': 'DATE-TRR',
  'UNIT > OFFICERS': 'UNIT-OFFICERS'
};

const baseItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  to: get(item, 'to'),
  url: get(item, 'url'),
  uniqueKey: get(item, 'uniqueKey', `${uniqueKeyMap[item.type] || item.type}-${item.id}`),
  ...get(textsMap, item.type, getBaseTexts)(item)
});

export const searchResultItemTransform = (item) => ({
  ...baseItemTransform(item),
  tags: get(item, 'tags', []),
  itemIndex: item.itemIndex || 1,
  ...get(searchResultTransformMap, item.type, () => {})(item)
});

export const navigationItemTransform = item => ({
  ...baseItemTransform(item),
});
