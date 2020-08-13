import { createSelector } from 'reselect';
import { map, toLower } from 'lodash';
import numeral from 'numeral';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { officerPath } from 'utils/paths';
import { getCurrentAgeString } from 'utils/date';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


const MONEY_FORMAT = '0,0.00';
const MONEY_FORMAT_SHORT = '0.0a';
const MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD = 100000;

const moneyFormat = (money) => money ? numeral(money).format(MONEY_FORMAT) : '-';

const moneyFormatShort = (money) => money ? numeral(money).format(MONEY_FORMAT_SHORT) : '0';

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
    lawsuitPayment: moneyFormatShort(officer['lawsuit_payment']),
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

const totalPaymentsTransform = (totalPayments) => {
  const totalSettlement = totalPayments['total_settlement'] || 0;

  return {
    total: moneyFormat(totalPayments['total']),
    totalSettlement: moneyFormat(totalSettlement),
    totalLegalFees: moneyFormat(totalPayments['total_legal_fees']),
    mustBeAcceptedByCouncilCity: totalSettlement > MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD,
  };
};

export const lawsuitSelector = createSelector(
  getlawsuit,
  pinboardItemsSelector,
  (lawsuit, pinboardItems) => {
    const totalPayments = lawsuit['total_payments'] || {};

    return {
      caseNo: lawsuit['case_no'],
      summary: lawsuit['summary'],
      primaryCause: lawsuit['primary_cause'],
      address: lawsuit['address'],
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
      totalPaymentsDisplayShort: moneyFormatShort(totalPayments['total']),
      totalPayments: totalPaymentsTransform(totalPayments),
      attachment: lawsuit['attachment'] && attachmentTransform(lawsuit['attachment']),
    };
  },
);
