import { get, sumBy, map, last, kebabCase } from 'lodash';
import moment from 'moment';

import { extractPercentile } from 'selectors/common/percentile';
import { getCurrentAge, formatDate } from 'utils/date';
import { roundedPercentile } from 'utils/calculations';
import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';
import { getDemographicString } from 'utils/victims';
import {
  navigationItemTransform as searchTermNavigationItemTransform,
} from 'selectors/search-page/search-terms/transforms';


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

export const previewPaneTransform = item => {
  const { type } = item;
  const transform = get(searchResultTransformMap, type, () => {});
  return {
    type,
    data: transform(item),
  };
};

const officerMostComplaintTransform = officer => {
  const percentile = extractPercentile(officer);
  return {
    id: officer.id,
    count: officer.count,
    name: officer.name,
    url: `/officer/${officer.id}/${kebabCase(officer.name)}/`,
    radarAxes: percentile.items,
    radarColor: percentile.visualTokenBackground,
  };
};

const areaTransform = (item) => {
  const population = sumBy(item['race_count'], 'count');
  const transformedOfficersMostComplaint = map(item['officers_most_complaint'], officerMostComplaintTransform);
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
    }),
    alderman: item['alderman'],
    districtCommander: item.commander ? {
      'id': item.commander['id'],
      'name': item.commander['full_name'],
      'count': item.commander['allegation_count'],
      'url': `/officer/${item.commander['id']}/${kebabCase(item.commander['full_name'])}/`,
    } : null,
    policeHQ: item['police_hq'],
  };
};

const rankTransform = item => {
  const officersMostComplaints = map(item['officers_most_complaints'], officerMostComplaintTransform);
  return {
    name: item.name,
    activeOfficersCount: item['active_officers_count'],
    officersMostComplaints,
  };
};

const accusedTransform = coaccused => {
  const percentile = extractPercentile(coaccused.percentile);
  return {
    id: coaccused.id,
    name: coaccused['full_name'],
    url: `/officer/${coaccused.id}/${kebabCase(coaccused['full_name'])}/`,
    count: coaccused['allegation_count'],
    radarAxes: percentile.items,
    radarColor: percentile.visualTokenBackground,
  };
};

const getSubText = (highlight) => {
  if (highlight) {
    const summary = highlight.summary ? highlight.summary[0] : '';
    const textContent = highlight['text_content'] ? highlight['text_content'][0] : '';
    return summary || textContent || '';
  }
  return '';
};

const crTransform = (item) => {
  const coaccused = map(item.coaccused, accusedTransform);
  return {
    subText: getSubText(item.highlight),
    coaccused,
    victims: map(item.victims, getDemographicString),
    address: item.address,
    category: item.category,
    subCategory: item['sub_category'],
    incidentDate: formatDate(item['incident_date']),
    to: item.to,
  };
};

const trrTransform = (item) => {
  const dateText = item['trr_datetime'] ? ` - ${moment(item['trr_datetime']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    subText: `TRR # ${item.id}${dateText}`,
  };
};

const officerTransform = (item) => {
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
};

const searchResultTransformMap = {
  'SEARCH-TERMS': searchTermNavigationItemTransform,
  'DATE > CR': crTransform,
  'DATE > TRR': trrTransform,
  'DATE > OFFICERS': officerTransform,
  'UNIT > OFFICERS': officerTransform,
  OFFICER: officerTransform,
  CR: crTransform,
  TRR: trrTransform,
  COMMUNITY: areaTransform,
  NEIGHBORHOOD: areaTransform,
  WARD: areaTransform,
  'POLICE-DISTRICT': areaTransform,
  BEAT: areaTransform,
  'SCHOOL-GROUND': areaTransform,
  RANK: rankTransform,
  'INVESTIGATOR > CR': crTransform,
};

const getBaseTexts = (item) => ({ text: item.name, recentText: item.name });
const getCRTexts = (item) => {
  const dateText = item['incident_date'] ? ` - ${moment(item['incident_date']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    text: `CR # ${item.crid}${dateText}`,
    recentText: `CR # ${item.crid}${dateText}`,
  };
};
const getTRRTexts = (item) => ({ text: item['force_type'] || 'Unknown', recentText: item.id });
const getUnitTexts = (item) => {
  const text = item.description || `Unit ${item.name}`;
  return { text, recentText: text };
};
const getSearchTermTexts = (item) => {
  const text = `${item.category_name} - ${item.name}`;
  return { text, recentText: text };
};

const textsMap = {
  'SEARCH-TERMS': getSearchTermTexts,
  'DATE > CR': getCRTexts,
  'DATE > TRR': getTRRTexts,
  CR: getCRTexts,
  TRR: getTRRTexts,
  UNIT: getUnitTexts,
  'INVESTIGATOR > CR': getCRTexts,
};

const uniqueKeyMap = {
  'DATE > CR': 'DATE-CR',
  'DATE > TRR': 'DATE-TRR',
  'UNIT > OFFICERS': 'UNIT-OFFICERS',
  'DATE > OFFICERS': 'DATE-OFFICERS',
  'INVESTIGATOR > CR': 'INVESTIGATOR-CR',
};

const baseItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  to: get(item, 'to'),
  url: get(item, 'url'),
  uniqueKey: get(item, 'uniqueKey', `${uniqueKeyMap[item.type] || item.type}-${item.id}`),
  ...get(textsMap, item.type, getBaseTexts)(item),
});

export const searchResultItemTransform = (item) => ({
  ...baseItemTransform(item),
  tags: get(item, 'tags', []),
  itemIndex: item.itemIndex || 1,
  ...get(searchResultTransformMap, item.type, () => {})(item),
});

export const navigationItemTransform = item => ({
  ...baseItemTransform(item),
});
