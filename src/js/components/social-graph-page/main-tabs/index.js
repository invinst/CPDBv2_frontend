import React, { Component, PropTypes } from 'react';
import { keys, toLower, kebabCase } from 'lodash';
import cx from 'classnames';

import styles from './main-tabs.sass';
import { DATA_VISUALIZATION_TAB_NAMES } from 'utils/constants';


export default class MainTabs extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(tabName) {
    const { changeTab, updatePathName, pinboardId, query } = this.props;

    const pathname = `/${toLower(kebabCase(tabName))}/${pinboardId ? `pinboard/${pinboardId}/` : ''}${query}`;

    changeTab(tabName);
    updatePathName(pathname);
  }

  render() {
    const { currentTab } = this.props;

    const tabsMap = {
      [DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH]: 'social-graph-btn',
      [DATA_VISUALIZATION_TAB_NAMES.GEOGRAPHIC]: 'geographic-btn',
    };

    return (
      <div className={ styles.mainTabs }>
        {
          keys(tabsMap).map(tabName => (
            <div
              key={ tabName }
              className={ cx(tabsMap[tabName], { 'active': currentTab === tabName }) }
              onClick={ () => this.handleClick(tabName) }
            />
          ))
        }
      </div>
    );
  }
}

MainTabs.propTypes = {
  currentTab: PropTypes.string,
  pinboardId: PropTypes.string,
  query: PropTypes.string,
  changeTab: PropTypes.func,
  updatePathName: PropTypes.func,
};

MainTabs.defaultProps = {
  changeTab: () => {},
  updatePathName: () => {},
};
