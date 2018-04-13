import { createSelector } from 'reselect';
import { map, get, reduce, defaults } from 'lodash';

import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { pluralize } from 'utils/language';


const getCoaccused = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].coaccused;
};

const getComplainants = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].complainants;
};

const getVictims = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].victims;
};

const getCR = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? {} : state.crs[crid];
};

const getInvolvements = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].involvements;
};

const getAttachments = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].attachments;
};

export const getCRID = state => String(state.crPage.crid);
export const getOfficerId = state => state.crPage.officerId;

export const getDocumentAlreadyRequested = state => {
  const crid = state.crPage.crid;
  return Boolean(get(
    state, `crPage.attachmentRequest.subscribedCRIDs[${crid}]`, undefined
  ));
};

const getDemographicString = ({ race, gender, age }) => {
  race = race ? race : 'Unknown';
  gender = gender ? gender : 'Unknown';

  if (age) {
    return `${race}, ${gender}, Age ${age}`;
  } else {
    return `${race}, ${gender}`;
  }
};

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, (complainant) => getDemographicString(complainant))
);

const getVictimStringSelector = createSelector(
  getVictims,
  (victims) => map(victims, (victim) => getDemographicString(victim))
);

const getCoaccusedSelector = createSelector(
  getCoaccused,
  coaccusedList => map(coaccusedList, coaccused => ({
    id: coaccused.id,
    fullname: coaccused['full_name'],
    rank: coaccused['rank'] || 'Officer',
    gender: coaccused['gender'] || 'Unknown',
    race: coaccused['race'] || 'Unknown',
    outcome: coaccused['final_outcome'] || 'Unknown Outcome',
    category: coaccused['category'] || 'Unknown',
    age: coaccused['age'],
    allegationCount: coaccused['allegation_count'],
    sustainedCount: coaccused['sustained_count'],
    allegationPercentile: coaccused['percentile_allegation'],
    radarAxes: [
      { axis: 'trr', value: parseFloat(coaccused['percentile_trr']) },
      { axis: 'internal', value: parseFloat(coaccused['percentile_allegation_internal']) },
      { axis: 'civilian', value: parseFloat(coaccused['percentile_allegation_civilian']) }
    ],
    radarColor: getVisualTokenOIGBackground(
      parseFloat(coaccused['percentile_allegation_internal']),
      parseFloat(coaccused['percentile_allegation_civilian']),
      parseFloat(coaccused['percentile_trr'])
    )
  }))
);

const getInvestigatorAffiliation = obj => {
  if (obj['current_rank'].indexOf('IPRA') > -1) {
    return 'IPRA';
  }

  return 'CPD';
};

const getInvolvementsSelector = createSelector(
  getInvolvements,
  involvements => reduce(involvements, (accumulator, obj) => {
    const type = obj['involved_type'];
    accumulator = defaults(accumulator, { [type]: [] });
    let officer = {
      id: obj['officer_id'],
      fullName: obj['full_name'],
      radarAxes: [
        { axis: 'trr', value: parseFloat(obj['percentile_trr']) },
        { axis: 'internal', value: parseFloat(obj['percentile_allegation_internal']) },
        { axis: 'civilian', value: parseFloat(obj['percentile_allegation_civilian']) }
      ],
      radarColor: getVisualTokenOIGBackground(
        parseFloat(obj['percentile_allegation_internal']),
        parseFloat(obj['percentile_allegation_civilian']),
        parseFloat(obj['percentile_trr'])
      )
    };

    if (type === 'investigator') {
      officer = {
        ...officer,
        tag: getInvestigatorAffiliation(obj)
      };
    } else if (type === 'police_witness') {
      officer = {
        ...officer,
        extraInfo: `
          ${obj['allegation_count']} ${pluralize('allegation', obj['allegation_count'])}
          ${obj['sustained_count']} sustained
        `
      };
    }

    accumulator[type].push(officer);
    return accumulator;
  }, {})
);

export const contentSelector = createSelector(
  getCoaccusedSelector,
  getComplainantStringSelector,
  getVictimStringSelector,
  getCR,
  getInvolvementsSelector,
  getAttachments,
  (coaccused, complainants, victims, cr, involvements, attachments) => ({
    coaccused,
    complainants,
    victims,
    point: cr.point,
    incidentDate: cr['incident_date'],
    address: cr.address,
    crLocation: cr.location,
    beat: cr.beat || 'Unknown',
    summary: cr.summary,
    startDate: cr['start_date'],
    endDate: cr['end_date'],
    involvements,
    attachments: map(attachments, attachment => ({
      title: attachment.title,
      url: attachment.url,
      previewImageUrl: attachment['preview_image_url']
    }))
  })
);
