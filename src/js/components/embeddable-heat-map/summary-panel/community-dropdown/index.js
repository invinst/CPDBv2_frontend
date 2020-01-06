import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { find } from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { QUICK_ANIMATION_DURATION, MEDIUM_ANIMATION_DURATION } from 'utils/constants';
import CommunityDetail from './community-detail';
import Dropdown from './dropdown';
import styles from './community-dropdown.sass';


const TRANSITION_CLASS_NAMES = {
  enter: styles.dropdownTransitionEnter,
  enterActive: styles.dropdownTransitionEnterActive,
  exit: styles.dropdownTransitionExit,
  exitActive: styles.dropdownTransitionExitActive,
};

export default class CommunityDropdown extends Component {
  getChildren() {
    const { communityId, showDropdown } = this.props;
    if (communityId) {
      return {
        key: 'community-detail',
        getElement: () => (
          <CommunityDetail
            closeDetail={ () => this.props.selectCommunity(0) }
            community={ find(this.props.communities, obj => obj.id === this.props.communityId) }/>
        ),
      };
    } else if (showDropdown) {
      return {
        key: 'dropdown',
        getElement: () => (
          <Dropdown
            closeDropdown={ this.props.closeDropdown }
            communities={ this.props.communities }
            selectCommunity={ this.props.selectCommunity }/>
        ),
      };
    } else {
      return {
        key: 'dropdown',
        getElement: () => null,
      };
    }
  }

  render() {
    const { key, getElement } = this.getChildren();
    return (
      <SwitchTransition mode='in-out'>
        <CSSTransition
          key={ key }
          timeout={ { appear: 0, enter: MEDIUM_ANIMATION_DURATION, exit: QUICK_ANIMATION_DURATION } }
          in={ true }
          classNames={ TRANSITION_CLASS_NAMES }
        >
          <div className={ styles.dropdownWrapper }>
            <div className={ styles.dropdownChild }>
              { getElement() }
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
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
