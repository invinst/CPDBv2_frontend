import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import SocialGraphOfficersContainer from 'containers/social-graph-page/social-graph-officers-container';
import SocialGraphTimelineContainer from 'containers/social-graph-page/social-graph-timeline-container';
import { SOCIAL_GRAPH_PAGE_TAB_NAMES } from 'utils/constants';
import styles from './social-graph-pane-section.sass';


export default class SocialGraphPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeSocialGraphTab,
      hasComplaint,
    } = this.props;
    const socialgraphPaneMap = {
      [SOCIAL_GRAPH_PAGE_TAB_NAMES.OFFICERS]: {
        component: SocialGraphOfficersContainer,
        show: true,
      },
      [SOCIAL_GRAPH_PAGE_TAB_NAMES.TIMELINE]: {
        component: SocialGraphTimelineContainer,
        show: hasComplaint,
      },
    };
    const CurrentComponent = get(socialgraphPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ cx(styles.socialGraphPaneSection, 'social-graph-pane-section') }>
        <div className='social-graph-pane-section-menu'>
          {
            keys(socialgraphPaneMap).map(paneName => (
              get(socialgraphPaneMap, `${paneName}.show`) ? (
                <span
                  key={ paneName }
                  className={ cx('social-graph-pane-tab-name', { 'active': paneName === currentTab }) }
                  onClick={ () => changeSocialGraphTab(paneName) }
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

SocialGraphPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeSocialGraphTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
};
