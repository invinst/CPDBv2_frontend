import React from 'react';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import style from './involved-officer-card.sass';

export default function InvolvedOfficerCard(props) {
  const { officer, addOrRemoveItemInPinboard } = props;
  return (
    <SmallRadarChartOfficerCard
      { ...officer }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      cardFooter={
        <div className='officer-total-lawsuit-settlements'>
          <div className='officer-total-lawsuit-settlements-value'>${ officer.totalLawsuitSettlements }</div>
          <div className='officer-total-lawsuits'>
            in {officer.lawsuitCount} {pluralize('lawsuit', officer.lawsuitCount)}
          </div>
        </div>
      }
      className={ style.involvedOfficerCard }
    />
  );
}

InvolvedOfficerCard.propTypes = {
  officer: PropTypes.object,
  addOrRemoveItemInPinboard: PropTypes.func,
};
