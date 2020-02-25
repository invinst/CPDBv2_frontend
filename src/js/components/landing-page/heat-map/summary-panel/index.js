import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { QUICK_ANIMATION_DURATION } from 'utils/constants';
import CommunityDropdown from './community-dropdown';
import CitySummary from 'containers/landing-page/heat-map/city-summary-container';
import styles from './summary-panel.sass';


const transitionStyle = (top) => ({ top: `${top}px`, transition: `top ${ QUICK_ANIMATION_DURATION }ms ease-in` });

export default class SummaryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }

  render() {
    const { showDropdown } = this.state;
    const { communityId, communities, selectCommunity } = this.props;
    const topValue = (showDropdown || communityId) ? -322 : 60;

    return (
      <div className={ styles.summaryPanel } style={ transitionStyle(topValue) }>
        <CitySummary isActive={ !(showDropdown || communityId) } onClick={ () => {
          selectCommunity(0);
          this.setState({ showDropdown: false });
        } }/>
        <CommunityDropdown
          communityId={ communityId }
          communities={ communities }
          showDropdown={ showDropdown }
          openDropdown={ () => this.setState({ showDropdown: true }) }
          closeDropdown={ () => this.setState({ showDropdown: false }) }
          selectCommunity={ community => {
            selectCommunity(community);
            this.setState({ showDropdown: false });
          } }/>
      </div>
    );
  }
}

SummaryPanel.propTypes = {
  communityId: PropTypes.number,
  selectCommunity: PropTypes.func,
  communities: PropTypes.array,
};
