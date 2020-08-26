import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import pluralize from 'pluralize';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import style from './lawsuit-page.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import { getLawsuitMapUrl } from 'utils/mapbox';
import OutboundLink from 'components/common/outbound-link';
import { imageStyle } from 'components/common/shared.style';
import InvolvedOfficers from './involved-officers';
import Summary from './summary';


export default function LawsuitPage(props) {
  const {
    caseNo,
    summary,
    primaryCause,
    address,
    location,
    interactions,
    services,
    misconducts,
    violences,
    outcomes,
    incidentDate,
    plaintiffs,
    officers,
    payments,
    totalPaymentsDetails,
    totalPaymentsDisplay,
    point,
    attachment,
    addOrRemoveItemInPinboard,
  } = props;

  const officersCount = officers.length;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ `Case ${caseNo}` }</title>
      </Helmet>
      <div className={ style.lawsuitPage }>
        <ShareableHeaderContainer/>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <div className='lawsuit-content'>
            <div className='lawsuit-label'>LAWSUIT</div>
            <div className='basic-info'>
              <div className='lawsuit-title'>
                <div className='case-no'>Case {caseNo}</div>
                <div className='primary-cause'>{primaryCause}</div>
              </div>
              <div className='total-payments-summary'>
                <div className='total-payments-summary-value'>${ totalPaymentsDisplay }</div>
                <div className='total-payments-summary-label'>Total payments</div>
              </div>
              <div className='clearfix' />
            </div>

            <div className='summary-section'>
              {
                attachment && (
                  <OutboundLink
                    href={ attachment.url }
                    className='attachment-image-href'
                    target='_blank'
                  >
                    <div className='attachment-image' style={ imageStyle(attachment.previewImageUrl) } />
                  </OutboundLink>
                )
              }
              <Summary summary={ summary } className='summary-info' />
              <div className='clearfix' />
            </div>

            <div className='officers-section section'>
              <div className='section-label'>
                {officersCount} Involved {pluralize('Officer', officersCount)} ({pluralize('Defendant', officersCount)})
              </div>
              <InvolvedOfficers officers={ officers } addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard } />
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
                <div className={
                  cx({ 'must-be-accepted-by-council-city': totalPaymentsDetails.mustBeAcceptedByCouncilCity })
                }>
                  <div className='payment-row subtotals'>
                    <div className='payee'>Subtotals</div>
                    <div className='settlement'>
                      { totalPaymentsDetails.mustBeAcceptedByCouncilCity && '*' }
                      { totalPaymentsDetails.totalSettlement }
                    </div>
                    <div className='legal-fees'>{ totalPaymentsDetails.totalLegalFees }</div>
                  </div>
                  {
                    totalPaymentsDetails.mustBeAcceptedByCouncilCity && (
                      <div className='must-be-accepted-by-council-city-description'>
                        *Lawsuits over 100K must be approved by City Council
                      </div>
                    )
                  }
                </div>

                <div className='payment-row total-payments'>
                  <div className='total-payments-label'>Total Payments</div>
                  <div className='total-payments-value'>{ totalPaymentsDetails.totalPayments }</div>
                </div>
              </div>
            </div>

            <div className='case-breakdown-section section'>
              <div className='section-label'>Case Breakdown</div>
              <div className='case-breakdown-table'>
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

            <div className='case-details-section section'>
              <div className='section-label'>Case Details</div>
              <div className='field-row'>
                <div className='field-row-label'>Plaintiff</div>
                <div className='field-row-value'>{plaintiffs.map((plaintiff) => plaintiff['name']).join(', ')}</div>
              </div>
              <div className='field-row'>
                <div className='field-row-label'>Incident date</div>
                <div className='field-row-value'>{incidentDate}</div>
              </div>
              {
                !isEmpty(location) && (
                  <div className='field-row location-description'>
                    <div className='field-row-label'>Location</div>
                    <div className='field-row-value'>{location}</div>
                  </div>
                )
              }
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
  primaryCause: PropTypes.string,
  address: PropTypes.string,
  location: PropTypes.string,
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
  totalPaymentsDetails: PropTypes.shape({
    totalPayments: PropTypes.string,
    totalSettlement: PropTypes.string,
    totalLegalFees: PropTypes.string,
    mustBeAcceptedByCouncilCity: PropTypes.bool,
  }),
  totalPaymentsDisplay: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  attachment: PropTypes.shape({
    url: PropTypes.string,
    previewImageUrl: PropTypes.string,
  }),
};

LawsuitPage.defaultProps = {
  officers: [],
  payments: [],
  totalPaymentsDetails: {},
  interactions: [],
  services: [],
  misconducts: [],
  violences: [],
  outcomes: [],
  plaintiffs: [],
};
