import PropTypes from 'prop-types';
import React from 'react';
import { find } from 'lodash';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { QUICK_ANIMATION_DURATION, MEDIUM_ANIMATION_DURATION } from 'utils/constants';
import CommunityDetail from './community-detail';
import styles from './community-dropdown.sass';


const TRANSITION_CLASS_NAMES = {
  enter: styles.dropdownTransitionEnter,
  enterActive: styles.dropdownTransitionEnterActive,
  exit: styles.dropdownTransitionExit,
  exitActive: styles.dropdownTransitionExitActive,
};

export default function CommunityDropdown({ communityId, communities, selectCommunity }) {
  return (
    <TransitionGroup>
      <CSSTransition
        key={ communityId != 0 ? 'community-detail' : 'community' }
        timeout={ { appear: 0, enter: MEDIUM_ANIMATION_DURATION, exit: QUICK_ANIMATION_DURATION } }
        in={ true }
        classNames={ TRANSITION_CLASS_NAMES }
      >
        <div className={ styles.communityDetailWrapper }>
          {
            communityId != 0 && (
              <CommunityDetail
                closeDetail={ () => selectCommunity(0) }
                community={ find(communities, obj => obj.id === communityId) }
              />
            )
          }
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

CommunityDropdown.propTypes = {
  communities: PropTypes.array,
  selectCommunity: PropTypes.func,
  communityId: PropTypes.number,
};
