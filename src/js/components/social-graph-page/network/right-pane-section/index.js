import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import SocialGraphOfficersContainer from 'containers/social-graph-page/social-graph-officers-container';
import SocialGraphTimelineContainer from 'containers/social-graph-page/social-graph-timeline-container';
import { NETWORK_TAB_NAMES } from 'utils/constants';
import styles from './right-pane-section.sass';


export default class RightPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeNetworkTab,
      hasComplaint,
    } = this.props;
    const rightPaneMap = {
      [NETWORK_TAB_NAMES.OFFICERS]: {
        component: SocialGraphOfficersContainer,
        show: true,
      },
      [NETWORK_TAB_NAMES.TIMELINE]: {
        component: SocialGraphTimelineContainer,
        show: hasComplaint,
      },
    };
    const CurrentComponent = get(rightPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ cx(styles.rightPaneSection, 'right-pane-section') }>
        <div className='right-pane-section-menu'>
          {
            keys(rightPaneMap).map(paneName => (
              get(rightPaneMap, `${paneName}.show`) ? (
                <span
                  key={ paneName }
                  className={ cx('right-pane-tab-name', { 'active': paneName === currentTab }) }
                  onClick={ () => changeNetworkTab(paneName) }
                >
                  { paneName }
                </span>
              ) : null
            ))
          }
          <div className='clearfix' />
        </div>
        { CurrentComponent && <CurrentComponent /> }
      </div>
    );
  }
}

RightPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeNetworkTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
};
