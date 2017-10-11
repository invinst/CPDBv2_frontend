import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import TimelinePage from './timeline-page';
import SocialGraphPageContainer from 'containers/officer-page/social-graph-page';
import { pageWrapperStyle, headerStyle } from './officer-page.style';
import StickyHeader from 'components/common/sticky-header';


export default class OfficerPage extends Component {
  renderContent() {
    const { location, officerId } = this.props;
    const parts = location.pathname.split('/');
    const path = parts[parts.length - 2];
    if (path === 'timeline') {
      return <TimelinePage officerId={ officerId } urlParams={ location.query }/>;
    } else if (path === 'social') {
      return <SocialGraphPageContainer officerId={ officerId }/>;
    }
    return <SummaryPageContainer officerId={ officerId }/>;
  }

  render() {
    const { location, officerName, officerTimelineUrlParams } = this.props;
    const { pathname } = location;

    return (
      <div>
        <StickyHeader style={ headerStyle }>
          <Header
            officerName={ officerName }
            pathname={ pathname }
            officerTimelineUrlParams={ officerTimelineUrlParams }
          />
        </StickyHeader>
        <div style={ pageWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  location: PropTypes.object,
  officerName: PropTypes.string,
  officerId: PropTypes.number,
  officerTimelineUrlParams: PropTypes.string
};

OfficerPage.defaultProps = {
  location: { pathname: '/' }
};
