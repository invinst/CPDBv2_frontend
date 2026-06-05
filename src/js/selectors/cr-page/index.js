import { createSelector } from 'reselect';
import { map, get, reduce, defaults, sortBy, kebabCase, isNil, isEmpty, compact, each, some } from 'lodash';
import pluralize from 'pluralize';

import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { getOfficerId as parseOfficerId } from 'utils/location';
import { getBreadcrumbItems } from 'selectors/breadcrumb';
import { officerCardTransform } from 'selectors/common/officer-card';
import { getDemographicString } from 'utils/victims';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


export const getEditModeOn = state => state.crPage.editModeOn;

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

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, (complainant) => getDemographicString(complainant))
);

const getVictimStringSelector = createSelector(
  getVictims,
  (victims) => compact(map(victims, getDemographicString))
);

const getTransformedCoaccused = createWithIsPinnedSelector(
  getCoaccused,
  PINNED_ITEM_TYPES.OFFICER,
  coaccused => ({
    ...officerCardTransform(coaccused),
    coaccusedCount: coaccused['coaccused_count'],
    findings: coaccused['findings'],
    outcome: coaccused['final_outcome'],
    recommendedOutcome: coaccused['recommended_outcome'],
    disciplined: coaccused['disciplined'],
  })
);

const breadcrumbOfficerIdsSelector = createSelector(
  getBreadcrumbItems,
  (breadcrumbItems) => {
    const results = [];

    each(breadcrumbItems, (item) => {
      const officerId = parseOfficerId(item);
      if (officerId) {
        results.push(officerId);
      }
    });

    return results;
  }
);

const sortByOfficerInBreadcrumb = breadcrumbOfficerIds => officer => {
  return -breadcrumbOfficerIds.indexOf(parseInt(officer.id));
};

// TODO: revisit if we switch to recommended finding
const isSustainedFinding = finding => finding.final_finding == 'Sustained';
const isOfficerSustained = officer => some(officer.findings, isSustainedFinding);

const sortByOfficerFinding = officer => {
  return isOfficerSustained(officer) ? 0 : 1;
};

const sortByOfficerComplaint = officer => -officer.complaintCount;

const getCoaccusedSelector = createSelector(
  getTransformedCoaccused,
  breadcrumbOfficerIdsSelector,
  (officers, breadcrumbOfficerIds) => {
    return sortBy(
      officers,
      [
        sortByOfficerInBreadcrumb(breadcrumbOfficerIds),
        sortByOfficerFinding,
        sortByOfficerComplaint,
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
          { axis: 'civilian', value: parseFloat(obj['percentile_allegation_civilian']) },
        ],
        radarColor: getVisualTokenOIGBackground(parseFloat(obj['percentile_allegation'])),
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
          `,
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
    category: get(cr, 'most_common_category.category', 'Unknown'),
    subcategory: get(cr, 'most_common_category.allegation_name', 'Unknown'),
    startDate: cr['start_date'],
    endDate: cr['end_date'],
    involvements,
    attachments: map(attachments, attachment => ({
      title: attachment.title,
      url: attachment.url,
      previewImageUrl: attachment['preview_image_url'],
      fileType: attachment['file_type'],
      id: attachment['id'],
    })),
  })
);

export const hasAttachmentsSelector = state => !isEmpty(getAttachments(state));

export const isCrPinnedSelector = createSelector(
  getCRID,
  pinboardItemsSelector,
  (crid, pinboardItems) => isItemPinned('CR', crid, pinboardItems)
);

export const pinnableCrSelector = createSelector(
  getCR,
  (cr) => ({
    type: PINNED_ITEM_TYPES.CR,
    id: cr['crid'],
    incidentDate: cr['incident_date'],
    category: get(cr, 'most_common_category.category', 'Unknown'),
  })
);
