import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import { panelStyle } from './summary-panel.style';
import CommunityDropdown from './community-dropdown';
import CitySummary from 'containers/landing-page/heat-map/city-summary-container';


export default class SummaryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }

  renderChildren(top) {
    const { showDropdown } = this.state;
    const { communityId, communities, selectCommunity } = this.props;
    return (
      <div style={ panelStyle(top) }>
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

  render() {
    const { showDropdown } = this.state;
    const { communityId } = this.props;
    const topValue = (showDropdown || communityId) ? -322 : 60;

    return (
      <Motion
        defaultStyle={ { top: topValue } }
        style={ { top: spring(topValue, defaultConfig()) } }>
        {
          ({ top }) => this.renderChildren(top)
        }
      </Motion>
    );
  }
}

SummaryPanel.propTypes = {
  communityId: PropTypes.number,
  selectCommunity: PropTypes.func,
  communities: PropTypes.array,
};
