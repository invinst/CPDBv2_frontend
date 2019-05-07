import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import styles from './social-graph-page.sass';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import NetworkContainer from 'containers/social-graph-page/network-container';
import GeographicContainer from 'containers/social-graph-page/geographic-container';


export default class SocialGraphPage extends Component {
  render() {
    const {
      currentTab,
      location,
    } = this.props;
    const tabbedPaneMap = {
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK]: {
        component: NetworkContainer,
      },
      [SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC]: {
        component: GeographicContainer,
      },
    };
    const CurrentComponent = get(tabbedPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ styles.socialGraphPage }>
        {
          CurrentComponent && <CurrentComponent location={ location }/>
        }
      </div>
    );
  }
}

SocialGraphPage.propTypes = {
  location: PropTypes.object,
  currentTab: PropTypes.string,
};
