import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { compact, join } from 'lodash';
import cx from 'classnames';

import { PrintModeContext } from 'contexts';
import styles from './coaccused-card.sass';
import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import Findings from './findings/index.js';



export default function CoaccusedCard(props) {
  const {
    findings = [],
    disciplined,
    outcome,
  } = props;
  const { printMode } = useContext(PrintModeContext);
  const outcomeDisciplined = printMode && disciplined ? 'Disciplined' : null;

  return (
    <SmallRadarChartOfficerCard
      { ...props }
      className={ styles.coaccusedCard }
      cardFooter={
        <div>
          <div className='coaccused-card-footer'>
            <div
              className={
                cx('accused-card-outcome', { disciplined })
              }
            >
              <div className='finding-outcome-mix'>
                { join(compact([outcome, outcomeDisciplined]), ', ') }
              </div>
            </div>
          </div>
        < Findings findings={findings}/>
        </div>
      }
    />
  );
}

CoaccusedCard.propTypes = {
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
};

CoaccusedCard.defaultProps = {
  openCardInNewPage: false,
};
