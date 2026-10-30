import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { compact, join } from 'lodash';
import cx from 'classnames';

import { PrintModeContext } from 'contexts';
import styles from './coaccused-card.sass';
import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import Findings from './findings';

export default function CoaccusedCard(props) {
  const { isOpen, onToggle, ...cardProps } = props;
  const { id, findings = [], disciplined, outcome } = cardProps;
  const { printMode } = useContext(PrintModeContext);
  const outcomeDisciplined = printMode && disciplined ? 'Disciplined' : null;

  return (
    <SmallRadarChartOfficerCard
      { ...cardProps }
      className={ styles.coaccusedCard }
      cardFooter={
        <div className='coaccused-card-body'>
          <div className='coaccused-card-footer'>
            <div className={ cx('accused-card-outcome', { disciplined }) }>
              <div className='finding-outcome-mix'>
                { join(compact([outcome, outcomeDisciplined]), ', ') }
              </div>
            </div>
          </div>
          <Findings
            findings={ findings }
            officerId={ id }
            isOpen={ isOpen }
            onToggle={ onToggle }
          />
        </div>
      }
    />
  );
}

CoaccusedCard.propTypes = {
  id: PropTypes.number,
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  style: PropTypes.object,
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  allegationPercentile: PropTypes.number,
  age: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  rank: PropTypes.string,
  className: PropTypes.string,
  findings: PropTypes.array,
  disciplined: PropTypes.bool,
  category: PropTypes.string,
  findingOutcomeMix: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

CoaccusedCard.defaultProps = {
  openCardInNewPage: false,
};
