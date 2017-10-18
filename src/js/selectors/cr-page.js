import { createSelector } from 'reselect';
import { map, get } from 'lodash';



const getCoaccused = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].coaccused;
};

const getComplainants = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].complainants;
};

const getCR = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? {} : state.crs[crid];
};

const getInvolvements = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].involvements;
};

const getDocuments = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].documents;
};

const getVideos = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].videos;
};

const getAudios = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].audios;
};

export const getCRID = state => String(state.crPage.crid);
export const getOfficerId = state => state.crPage.officerId;

export const getDocumentAlreadyRequested = state => {
  const crid = state.crPage.crid;
  return Boolean(get(
    state, `crPage.attachmentRequest.subscribedCRIDs[${crid}]`, undefined
  ));
};

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, ({ race, gender, age }) => {
    race = race ? race : 'Unknown';
    gender = gender ? gender : 'Unknown';

    if (age) {
      return `${race}, ${gender}, Age ${age}`;
    } else {
      return `${race}, ${gender}`;
    }
  })
);

const getCoaccusedSelector = createSelector(
  getCoaccused,
  coaccusedList => map(coaccusedList, coaccused => ({
    id: coaccused.id,
    fullName: coaccused['full_name'],
    gender: coaccused['gender'] || 'Unknown',
    race: coaccused['race'] || 'Unknown',
    finalFinding: coaccused['final_finding'] || 'Unknown',
    reccOutcome: coaccused['recc_outcome'] || 'Unknown',
    finalOutcome: coaccused['final_outcome'] || 'Unknown',
    startDate: coaccused['start_date'],
    endDate: coaccused['end_date'],
    category: coaccused['category'] || 'Unknown',
    subcategory: coaccused['subcategory'] || 'Unknown',
    badge: coaccused['badge'] || 'Unknown'
  }))
);

const getInvolvementsSelector = createSelector(
  getInvolvements,
  involvements => map(involvements, obj => ({
    involvedType: obj['involved_type'],
    officers: map(obj.officers, officer => ({
      id: officer.id,
      abbrName: officer['abbr_name'],
      extraInfo: officer['extra_info']
    }))
  }))
);

export const contentSelector = createSelector(
  getCoaccusedSelector,
  getComplainantStringSelector,
  getCR,
  getInvolvementsSelector,
  getDocuments,
  getVideos,
  getAudios,
  (coaccused, complainants, cr, involvements, documents, videos, audios) => ({
    coaccused,
    complainants,
    point: cr.point,
    incidentDate: cr['incident_date'],
    address: cr.address,
    location: cr.location,
    beat: cr.beat || { name: 'Unknown' },
    involvements,
    documents,
    videos,
    audios,
  })
);
