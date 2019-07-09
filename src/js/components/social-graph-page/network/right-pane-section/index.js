import React, { Component, PropTypes } from 'react';
import { get, keys, pick } from 'lodash';
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
      showTimelineTab,
    } = this.props;
    const rightPaneMap = {
      [NETWORK_TAB_NAMES.TIMELINE]: {
        component: SocialGraphTimelineContainer,
        show: showTimelineTab,
        componentProps: ['location']
      },
      [NETWORK_TAB_NAMES.OFFICERS]: {
        component: SocialGraphOfficersContainer,
        show: true,
        componentProps: ['sortedOfficerIds']
      },
    };

    const itemComponent = get(rightPaneMap, currentTab, {});
    const CurrentComponent = itemComponent.component;
    const itemData = pick(this.props, itemComponent.componentProps);

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
        { CurrentComponent && <CurrentComponent { ...itemData } /> }
      </div>
    );
  }
}

RightPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeNetworkTab: PropTypes.func,
  showTimelineTab: PropTypes.bool,
  location: PropTypes.object,
  sortedOfficerIds: PropTypes.array,
};
