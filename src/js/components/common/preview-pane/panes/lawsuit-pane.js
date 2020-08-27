import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'lodash';

import { ListWidget, NewWidgetWrapper } from '../widgets';
import styles from './lawsuit-pane.sass';


export default function LawsuitPane(props) {
  const {
    caseNo,
    summary,
    primaryCause,
    to,
    officers,
    incidentDate,
    plaintiffs,
    address,
    location,
    totalPaymentsDisplay,
  } = props;

  const handleOfficerWidgetClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <NewWidgetWrapper callToAction={ { to, text: 'View full Lawsuit Details' } }>
      <div className={ styles.lawsuitPane }>
        <div className='lawsuit-title'>
          <div className='case-no'>Case {caseNo}</div>
          <div className='primary-cause'>{primaryCause}</div>
        </div>
        <div className='total-payments'>
          <div className='field-row'>
            <div className='field-row-label'>Total Payments</div>
            <div className='field-row-value'>${totalPaymentsDisplay}</div>
          </div>
        </div>
        <div onClick={ handleOfficerWidgetClick }>
          {
            !isEmpty(officers) && <ListWidget
              typeName='allegation'
              title='Involved Officers (Defendants)'
              showItemArrow={ false }
              items={ officers }
              expandable={ true }
              collapsible={ false }
              wrapperClassName='lawsuit-preview-pane-involved-officer'
            />
          }
        </div>
        <div className='case-details-section'>
          <div className='field-row'>
            <div className='field-row-label'>Plaintiff</div>
            <div className='field-row-value'>{ plaintiffs.map((plaintiff) => plaintiff['name']).join(', ') }</div>
          </div>
          <div className='field-row'>
            <div className='field-row-label'>Incident date</div>
            <div className='field-row-value'>{ incidentDate }</div>
          </div>
          {
            !isEmpty(location) && (
              <div className='field-row location-description'>
                <div className='field-row-label'>Location</div>
                <div className='field-row-value'>{ location }</div>
              </div>
            )
          }
          {
            !isEmpty(address) && (
              <div className='field-row'>
                <div className='field-row-label'>Location</div>
                <div className='field-row-value'>{ address }</div>
              </div>
            )
          }
        </div>
        <div className='summary-text'>{summary}</div>
      </div>
    </NewWidgetWrapper>
  );
}

LawsuitPane.propTypes = {
  caseNo: PropTypes.string,
  summary: PropTypes.string,
  primaryCause: PropTypes.string,
  address: PropTypes.string,
  location: PropTypes.string,
  incidentDate: PropTypes.string,
  to: PropTypes.string,
  totalPaymentsDisplay: PropTypes.string,
  officers: PropTypes.array,
  plaintiffs: PropTypes.array,
};
