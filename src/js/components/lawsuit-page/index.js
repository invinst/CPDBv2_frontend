import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import style from './lawsuit-page.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import OfficerRow from './officer-row';
import { getLawsuitMapUrl } from 'utils/mapbox';


export default function LawsuitPage(props) {
  const {
    caseNo,
    summary,
    address,
    interactions,
    services,
    misconducts,
    violences,
    outcomes,
    incidentDate,
    plaintiffs,
    officers,
    payments,
    totalPayments,
    totalPaymentsDisplayShort,
    point,
  } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ `Lawsuit ${caseNo}` }</title>
      </Helmet>
      <div className={ style.lawsuitPage }>
        <ShareableHeaderContainer/>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <div className='lawsuit-content'>
            <div className='lawsuit-label'>LAWSUIT</div>
            <div className='basic-info'>
              <div className='lawsuit-title'>
                <div className='case-no'>{caseNo}</div>
                <div className='misconduct'>{misconducts[0]}</div>
              </div>
              <div className='total-payments-summary'>
                <div className='total-payments-summary-value'>${ totalPaymentsDisplayShort }</div>
                <div className='total-payments-summary-label'>Total payments</div>
              </div>
              <div className='clearfix' />
            </div>
            <div className='field-row'>
              <div className='field-row-label'>Plaintiff</div>
              <div className='field-row-value'>{plaintiffs.map((plaintiff) => plaintiff['name']).join(', ')}</div>
            </div>
            <div className='field-row'>
              <div className='field-row-label'>Incident date</div>
              <div className='field-row-value'>{incidentDate}</div>
            </div>
            <div className='field-row'>
              <div className='field-row-label'>Location</div>
              <div className='field-row-value'>
                {address}
                <div
                  className='lawsuit-map'
                  style={ point ? {
                    background: `url("${getLawsuitMapUrl(point.lat, point.lon, 234, 130)}") no-repeat center/cover`,
                  }: null }
                />
              </div>
            </div>
            <div className='officers-section section'>
              <div className='section-label'>Involved Officers (Defendants)</div>
              {
                officers.map((officer) => (
                  <OfficerRow key={ officer.id } { ...officer } />
                ))
              }
            </div>

            <div className='summary-section section'>
              <div className='section-label'>Summary</div>
              <div>{ summary }</div>
              <div className='summary-table'>
                <div className='field-row'>
                  <div className='field-row-label'>Interaction</div>
                  <div className='field-row-value'>{ interactions.join(', ') }</div>
                </div>
                <div className='field-row'>
                  <div className='field-row-label'>Service</div>
                  <div className='field-row-value'>{ services.join(', ') }</div>
                </div>
                <div className='field-row'>
                  <div className='field-row-label'>Misconduct</div>
                  <div className='field-row-value'>{ misconducts.join(', ') }</div>
                </div>
                <div className='field-row'>
                  <div className='field-row-label'>Violence</div>
                  <div className='field-row-value'>{ violences.join(', ') }</div>
                </div>
                <div className='field-row'>
                  <div className='field-row-label'>Outcome</div>
                  <div className='field-row-value'>{ outcomes.join(', ') }</div>
                </div>
              </div>
            </div>

            <div className='payment-section section'>
              <div className='section-label'>Payment Breakdown</div>
              <div className='payment-breakdown-table'>
                <div className='payment-row payment-table-header'>
                  <div className='payee'>Payee</div>
                  <div className='settlement'>Settlement ($)</div>
                  <div className='legal-fees'>Legal Fees ($)</div>
                </div>
                {
                  payments.map(({ payee, settlement, legalFees }, index) => (
                    <div key={ index } className='payment-row detail-row'>
                      <div className='payee'>{ payee }</div>
                      <div className='settlement'>{ settlement }</div>
                      <div className='legal-fees'>{ legalFees }</div>
                    </div>
                  ))
                }
                <div className='payment-row subtotals'>
                  <div className='payee'>Subtotals</div>
                  <div className='settlement'>{ totalPayments.totalSettlement }</div>
                  <div className='legal-fees'>{ totalPayments.totalLegalFees }</div>
                </div>
                <div className='payment-row total-payments'>
                  <div className='total-payments-label'>Total Payments</div>
                  <div className='total-payments-value'>{ totalPayments.total }</div>
                </div>
              </div>
            </div>

            <div className='document-section section'>
              <div className='section-label'>Document</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

LawsuitPage.propTypes = {
  caseNo: PropTypes.string,
  summary: PropTypes.string,
  address: PropTypes.string,
  interactions: PropTypes.arrayOf(PropTypes.string),
  services: PropTypes.arrayOf(PropTypes.string),
  misconducts: PropTypes.arrayOf(PropTypes.string),
  violences: PropTypes.arrayOf(PropTypes.string),
  outcomes: PropTypes.arrayOf(PropTypes.string),
  incidentDate: PropTypes.string,
  plaintiffs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  point: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
  officers: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string,
    })
  ),
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      payee: PropTypes.string,
      settlement: PropTypes.string,
      legalFees: PropTypes.string,
    })
  ),
  totalPayments: PropTypes.shape({
    total: PropTypes.string,
    totalSettlement: PropTypes.string,
    totalLegalFees: PropTypes.string,
  }),
  totalPaymentsDisplayShort: PropTypes.string,
};
