import { createSelector } from 'reselect';
import { map, get, reduce, defaults, compact, sortBy, kebabCase, isNil } from 'lodash';
import pluralize from 'pluralize';

import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { getBreadcrumb } from '../breadcrumbs';
import { getFindingOutcomeMix } from './finding-outcome-mix';
import { officerCardTransform } from 'selectors/common/officer-card';

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

const getDemographicString = ({ race, gender, age }) =>
  compact([race, gender, age ? `Age ${age}` : null]).join(', ');

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, (complainant) => getDemographicString(complainant))
);

const getVictimStringSelector = createSelector(
  getVictims,
  (victims) => map(victims, (victim) => getDemographicString(victim))
);

const getTransformedCoaccused = createSelector(
  getCoaccused,
  (coaccusedList) => coaccusedList.map(coaccused => ({
    ...officerCardTransform(coaccused),
    coaccusedCount: coaccused['coaccused_count'],
    findingOutcomeMix: getFindingOutcomeMix(coaccused['final_finding'], coaccused['final_outcome']),
    finding: coaccused['final_finding'],
    outcome: coaccused['final_outcome'],
    recommendedOutcome: coaccused['recommended_outcome'],
    category: coaccused['category'] || 'Unknown',
    disciplined: coaccused['disciplined'],
  }))
);

const sortByOfficerInBreadcrumb = breadcrumbs => officer => {
  const officerIdsInBreadcrumb = breadcrumbs
    .filter(item => item.url.indexOf('officer/') > -1)
    .map(item => item.params.officerId);
  return -officerIdsInBreadcrumb.indexOf(String(officer.id));
};

const sortByOfficerFinding = officer => {
  return officer.finding === 'Sustained' ? 0 : 1;
};

const sortByOfficerComplaint = officer => -officer.complaintCount;

const getCoaccusedSelector = createSelector(
  getTransformedCoaccused,
  getBreadcrumb,
  (officers, { breadcrumbs }) => {
    return sortBy(
      officers,
      [
        sortByOfficerInBreadcrumb(breadcrumbs),
        sortByOfficerFinding,
        sortByOfficerComplaint
      ]
    );
  }
);

const getInvolvementsSelector = createSelector(
  getInvolvements,
  involvements => reduce(involvements, (accumulator, obj) => {
    const type = obj['involved_type'];
    accumulator = defaults(accumulator, { [type]: [] });

    if (
        isNil(obj['officer_id']) ||
        map(accumulator[type], 'id').indexOf(obj['officer_id']) === -1
      ) {
      let officer = {
        id: obj['officer_id'],
        fullName: obj['full_name'],
        officerSlug: kebabCase(obj['full_name']),
        radarAxes: [
          { axis: 'trr', value: parseFloat(obj['percentile_trr']) },
          { axis: 'internal', value: parseFloat(obj['percentile_allegation_internal']) },
          { axis: 'civilian', value: parseFloat(obj['percentile_allegation_civilian']) }
        ],
        radarColor: getVisualTokenOIGBackground(
          parseFloat(obj['percentile_allegation_civilian']),
          parseFloat(obj['percentile_allegation_internal']),
          parseFloat(obj['percentile_trr'])
        )
      };

      if (type === 'investigator') {
        officer = {
          ...officer,
          tag: obj.badge,
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
    }
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
    beat: cr.beat,
    summary: cr.summary,
    category: get(cr, 'most_common_category.category') || 'Unknown',
    subcategory: get(cr, 'most_common_category.allegation_name') || 'Unknown',
    startDate: cr['start_date'],
    endDate: cr['end_date'],
    involvements,
    attachments: map(attachments, attachment => ({
      title: attachment.title,
      url: attachment.url,
      previewImageUrl: attachment['preview_image_url'],
      fileType: attachment['file_type']
    }))
  })
);
