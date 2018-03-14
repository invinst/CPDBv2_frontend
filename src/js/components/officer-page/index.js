import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';

import { pageWrapperStyle } from './officer-page.style';
import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import TimelinePage from './timeline-page';
import SocialGraphPageContainer from 'containers/officer-page/social-graph-page';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class OfficerPage extends Component {

  shouldComponentUpdate(nextProps) {
    const { officerName, activeTab, query, officerTimelineUrlParams, location, scrollPosition } = this.props;
    return (
      officerName !== nextProps.officerName ||
      activeTab !== nextProps.activeTab ||
      !isEqual(query, nextProps.query) ||
      officerTimelineUrlParams !== nextProps.officerTimelineUrlParams ||
      !isEqual(location, nextProps.location) ||
      scrollPosition !== nextProps.scrollPosition
    );
  }

  renderChildren() {
    const { activeTab, query } = this.props;
    if (activeTab === 'timeline') {
      return <TimelinePage urlParams={ query }/>;
    } else if (activeTab === 'social') {
      return <SocialGraphPageContainer/>;
    }
    return <SummaryPageContainer/>;
  }

  render() {
    const { officerName, activeTab, location, officerTimelineUrlParams, scrollPosition } = this.props;

    return (
      <div>
        <ShareableHeaderContainer/>
        <Header
          officerName={ officerName }
          activeTab={ activeTab }
          pathname={ location.pathname }
          officerTimelineUrlParams={ officerTimelineUrlParams }
          scrollPosition={ scrollPosition }
        />
        <div style={ pageWrapperStyle }>
          { this.renderChildren() }
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  officerName: PropTypes.string,
  officerTimelineUrlParams: PropTypes.string,
  activeTab: PropTypes.string,
  location: PropTypes.object,
  query: PropTypes.object,
  scrollPosition: PropTypes.string,
};

OfficerPage.defaultProps = {
  scrollPosition: 'top',
};
