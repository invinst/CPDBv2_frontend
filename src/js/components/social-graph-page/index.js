import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import styles from './social-graph-page.sass';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import NetworkContainer from 'containers/social-graph-page/network-container';
import GeographicContainer from 'containers/social-graph-page/geographic-container';
import MainTabs from 'components/social-graph-page/main-tabs';


export default class SocialGraphPage extends Component {
  renderMainTabs() {
    const { pinboardId, currentTab, changeMainTab } = this.props;
    return (
      <div>
        {
          pinboardId && (
            <a className='back-to-pinboard-link' href={ `/pinboard/${pinboardId}/` }>← Back to pinboard</a>
          )
        }
        <MainTabs changeTab={ changeMainTab } currentTab={ currentTab }/>
      </div>
    );
  }

  render() {
    const {
      currentTab,
      location,
    } = this.props;
    const tabbedPaneMap = {
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK]: NetworkContainer,
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC]: GeographicContainer,
    };
    const CurrentComponent = get(tabbedPaneMap, currentTab, null);
    return (
      <div className={ styles.socialGraphPage }>
        {
          CurrentComponent && <CurrentComponent location={ location } mainTabsContent={ this.renderMainTabs() } />
        }
      </div>
    );
  }
}

SocialGraphPage.propTypes = {
  pinboardId: PropTypes.string,
  location: PropTypes.object,
  currentTab: PropTypes.string,
  changeMainTab: PropTypes.func,
};
