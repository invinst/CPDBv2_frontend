import { createSelector } from 'reselect';
import { map, toLower } from 'lodash';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { officerPath } from 'utils/paths';
import { getCurrentAgeString } from 'utils/date';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import { moneyFormat, moneyFormatShort } from 'utils/money';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


const MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD = 100000;

const getlawsuit = state => state.lawsuitPage.lawsuit;

const plaintiffTransform = (plaintiff) => ({
  name: plaintiff['name'],
});

const officerTransform = (officer, pinboardItems) => {
  const percentile = extractLatestPercentile(officer);

  return {
    officerId: officer.id,
    fullName: officer['full_name'],
    allegationPercentile: Number(officer['percentile_allegation']),
    sustainedCount: officer['sustained_count'],
    gender: officer['gender'] ? toLower(officer['gender']) : 'N/A',
    age: getCurrentAgeString(officer['birth_year']),
    race: officer['race'],
    rank: officer['rank'],
    lawsuitCount: officer['lawsuit_count'],
    totalLawsuitSettlements: moneyFormatShort(officer['total_lawsuit_settlements']),
    url: officerPath(officer.id, officer['full_name']),
    complaintCount: officer['allegation_count'],
    percentile,
    isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, officer.id, pinboardItems),
  };
};

const paymentTransform = (payment) => ({
  payee: payment['payee'],
  settlement: moneyFormat(payment['settlement']),
  legalFees: moneyFormat(payment['legal_fees']),
});

const attachmentTransform = attachment => ({
  fileType: attachment['file_type'],
  previewImageUrl: attachment['preview_image_url'],
  title: attachment['title'],
  url: attachment['url'],
  id: attachment['id'],
});

const totalPaymentsDetailsTransform = (lawsuit) => {
  const totalSettlement = lawsuit['total_settlement'] || 0;

  return {
    totalPayments: moneyFormat(lawsuit['total_payments']),
    totalSettlement: moneyFormat(totalSettlement),
    totalLegalFees: moneyFormat(lawsuit['total_legal_fees']),
    mustBeAcceptedByCouncilCity: totalSettlement > MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD,
  };
};

export const lawsuitSelector = createSelector(
  getlawsuit,
  pinboardItemsSelector,
  (lawsuit, pinboardItems) => ({
    caseNo: lawsuit['case_no'],
    summary: lawsuit['summary'],
    primaryCause: lawsuit['primary_cause'] || 'Unknown',
    address: lawsuit['address'],
    location: lawsuit['location'],
    interactions: lawsuit['interactions'],
    services: lawsuit['services'],
    misconducts: lawsuit['misconducts'],
    violences: lawsuit['violences'],
    outcomes: lawsuit['outcomes'],
    incidentDate: lawsuit['incident_date'],
    point: lawsuit['point'],
    plaintiffs: map(lawsuit['plaintiffs'], plaintiffTransform),
    officers: map(lawsuit['officers'], (officer) => officerTransform(officer, pinboardItems)),
    payments: map(lawsuit['payments'], paymentTransform),
    totalPaymentsDisplay: moneyFormatShort(lawsuit['total_payments']),
    totalPaymentsDetails: totalPaymentsDetailsTransform(lawsuit),
    attachment: lawsuit['attachment'] && attachmentTransform(lawsuit['attachment']),
  }),
);
