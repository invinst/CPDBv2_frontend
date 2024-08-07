import PropTypes from 'prop-types';
import React from 'react';

import { QUICK_ANIMATION_DURATION } from 'utils/constants';
import CommunityDropdown from './community-dropdown';
import CitySummary from 'containers/landing-page/heat-map/city-summary-container';
import styles from './summary-panel.sass';


const transitionStyle = (top) => ({ top: `${top}px`, transition: `top ${ QUICK_ANIMATION_DURATION }ms ease-in` });

export default function SummaryPanel({ communityId, communities, selectCommunity, scrollToTopLawsuit }) {
  const topValue = (communityId) ? -510 : 41;

  return (
    <div className={ styles.summaryPanel } style={ transitionStyle(topValue) }>
      <CitySummary
        isActive={ !(communityId) }
        onClick={ () => selectCommunity(0) }
        scrollToTopLawsuit={ scrollToTopLawsuit }
      />
      <CommunityDropdown
        communityId={ communityId }
        communities={ communities }
        selectCommunity={ selectCommunity }/>
    </div>
  );
}

SummaryPanel.propTypes = {
  communityId: PropTypes.number,
  selectCommunity: PropTypes.func,
  scrollToTopLawsuit: PropTypes.func,
  communities: PropTypes.array,
};
