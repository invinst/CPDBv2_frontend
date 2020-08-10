import { createSelector } from 'reselect';
import { map } from 'lodash';
import numeral from 'numeral';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { officerPath } from 'utils/paths';


const MONEY_FORMAT = '0,0.00';
const MONEY_FORMAT_SHORT = '0.00a';

const moneyFormat = (money) => money ? numeral(money).format(MONEY_FORMAT) : '-';

const getlawsuit = state => state.lawsuitPage.lawsuit;

const plaintiffTransform = (plaintiff) => ({
  name: plaintiff['name'],
});

const officerTransform = (officer) => {
  const percentile = extractLatestPercentile(officer);
  return {
    id: officer.id,
    fullName: officer['full_name'],
    url: officerPath(officer.id, officer['full_name']),
    allegationCount: officer['allegation_count'],
    radarAxes: percentile.items,
    radarColor: percentile.visualTokenBackground,
  };
};

const paymentTransform = (payment) => ({
  payee: payment['payee'],
  settlement: moneyFormat(payment['settlement']),
  legalFees: moneyFormat(payment['legal_fees']),
});

export const lawsuitSelector = createSelector(
  getlawsuit,
  (lawsuit) => {
    const totalPayments = lawsuit['total_payments'] || {};

    return {
      caseNo: lawsuit['case_no'],
      summary: lawsuit['summary'],
      address: lawsuit['address'],
      interactions: lawsuit['interactions'],
      services: lawsuit['services'],
      misconducts: lawsuit['misconducts'],
      violences: lawsuit['violences'],
      outcomes: lawsuit['outcomes'],
      incidentDate: lawsuit['incident_date'],
      plaintiffs: map(lawsuit['plaintiffs'], plaintiffTransform),
      officers: map(lawsuit['officers'], officerTransform),
      payments: map(lawsuit['payments'], paymentTransform),
      totalPaymentsDisplayShort: (
        totalPayments['total'] ? numeral(totalPayments['total']).format(MONEY_FORMAT_SHORT) : '0'
      ),
      totalPayments: {
        total: moneyFormat(totalPayments['total']),
        totalSettlement: moneyFormat(totalPayments['total_settlement']),
        totalLegalFees: moneyFormat(totalPayments['total_legal_fees']),
      },
    };
  },
);
