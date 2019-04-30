import React, { Component, PropTypes } from 'react';
import { keys } from 'lodash';

import styles from './main-tabs.sass';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import cx from 'classnames';


export default class MainTabs extends Component {
  render() {
    const { currentTab, changeTab } = this.props;

    const tabsMap = {
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK]: {
        className: 'social-graph-btn',
      },
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC]: {
        className: 'geographic-btn',
      },
    };

    return (
      <div className={ styles.mainTabs }>
        {
          keys(tabsMap).map(tabName => (
            <div
              key={ tabName }
              className={ cx(tabsMap[tabName].className, { 'active': currentTab === tabName }) }
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
