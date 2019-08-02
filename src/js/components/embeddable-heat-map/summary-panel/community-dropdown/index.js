import React, { PropTypes, Component } from 'react';
import { find } from 'lodash';
import { TransitionMotion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import CommunityDetail from './community-detail';
import Dropdown from './dropdown';
import { dropdownWrapperStyle, childStyle } from './community-dropdown.style';


export default class CommunityDropdown extends Component {
  willLeave() {
    return { opacity: spring(0) };
  }

  willEnter() {
    return { opacity: 0 };
  }

  getStyles() {
    const { communityId, showDropdown } = this.props;
    if (communityId) {
      return [{
        key: 'community-detail',
        style: { opacity: spring(1, defaultConfig()) },
        data: {
          getElement: () => (
            <CommunityDetail
              closeDetail={ () => this.props.selectCommunity(0) }
              community={ find(this.props.communities, obj => obj.id === this.props.communityId) }/>
          ),
        },
      }];
    } else if (showDropdown) {
      return [{
        key: 'dropdown',
        style: { opacity: spring(1, defaultConfig()) },
        data: {
          getElement: () => (
            <Dropdown
              closeDropdown={ this.props.closeDropdown }
              communities={ this.props.communities }
              selectCommunity={ this.props.selectCommunity }/>
          ),
        },
      }];
    } else {
      return [{
        key: 'dropdown',
        style: { opacity: spring(1, defaultConfig()) },
        data: {
          getElement: () => null,
        },
      }];
    }
  }

  render() {
    return (
      <TransitionMotion
        willLeave={ this.willLeave }
        willEnter={ this.willEnter }
        styles={
          this.getStyles()
        }>
        {
          interpolatedStyles => (
            <div style={ dropdownWrapperStyle }>
              {
                interpolatedStyles.map(config => (
                  <div key={ config.key } style={ { ...childStyle, ...config.style } }>
                    { config.data.getElement() }
                  </div>
                ))
              }
            </div>
          )
        }
      </TransitionMotion>
    );
  }
}

CommunityDropdown.propTypes = {
  communities: PropTypes.array,
  showDropdown: PropTypes.bool,
  openDropdown: PropTypes.func,
  closeDropdown: PropTypes.func,
  selectCommunity: PropTypes.func,
  communityId: PropTypes.number,
};
