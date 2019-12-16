import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import styles from './social-graph-page.sass';
import { DATA_VISUALIZATION_TAB_NAMES } from 'utils/constants';
import NetworkContainer from 'containers/social-graph-page/network-container';
import GeographicContainer from 'containers/social-graph-page/geographic-container';
import MainTabs from 'components/social-graph-page/main-tabs';


export default class SocialGraphPage extends Component {
  renderMainTabs() {
    const { pinboardId, currentTab, changeMainTab, updatePathName, location } = this.props;
    return (
      <div>
        {
          pinboardId && (
            <a className='back-to-pinboard-link' href={ `/pinboard/${pinboardId}/` }>← Back to pinboard</a>
          )
        }
        <MainTabs
          changeTab={ changeMainTab }
          updatePathName={ updatePathName }
          currentTab={ currentTab }
          pinboardId={ pinboardId }
          query={ location.search }
        />
      </div>
    );
  }

  render() {
    const {
      currentTab,
      location,
      params,
    } = this.props;
    const tabbedPaneMap = {
      [DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH]: NetworkContainer,
      [DATA_VISUALIZATION_TAB_NAMES.GEOGRAPHIC]: GeographicContainer,
    };
    const CurrentComponent = get(tabbedPaneMap, currentTab, null);
    return (
      <div className={ styles.socialGraphPage }>
        {
          CurrentComponent &&
          <CurrentComponent location={ location } mainTabsContent={ this.renderMainTabs() } params={ params }/>
        }
      </div>
    );
  }
}

SocialGraphPage.propTypes = {
  pinboardId: PropTypes.string,
  location: PropTypes.object,
  params: PropTypes.object,
  currentTab: PropTypes.string,
  changeMainTab: PropTypes.func,
  updatePathName: PropTypes.func,
};

SocialGraphPage.defaultProps = {
  params: {},
};
