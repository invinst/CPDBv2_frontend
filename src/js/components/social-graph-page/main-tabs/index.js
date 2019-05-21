import React, { Component, PropTypes } from 'react';
import { keys } from 'lodash';
import cx from 'classnames';

import styles from './main-tabs.sass';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';


export default class MainTabs extends Component {
  render() {
    const { currentTab, changeTab } = this.props;

    const tabsMap = {
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK]: 'social-graph-btn',
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC]: 'geographic-btn',
    };

    return (
      <div className={ styles.mainTabs }>
        {
          keys(tabsMap).map(tabName => (
            <div
              key={ tabName }
              className={ cx(tabsMap[tabName], { 'active': currentTab === tabName }) }
              onClick={ () => changeTab(tabName) }
            />
          ))
        }
      </div>
    );
  }
}

MainTabs.propTypes = {
  currentTab: PropTypes.string,
  changeTab: PropTypes.func,
};
