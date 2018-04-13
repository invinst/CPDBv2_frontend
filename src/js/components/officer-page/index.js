import React, { Component, PropTypes } from 'react';

import { pageWrapperStyle } from './officer-page.style';
import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import SocialGraphPageContainer from 'containers/officer-page/social-graph-page';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class OfficerPage extends Component {

  shouldComponentUpdate(nextProps) {
    const { officerName, activeTab, pathname, scrollPosition } = this.props;
    return (
      officerName !== nextProps.officerName ||
      activeTab !== nextProps.activeTab ||
      pathname !== nextProps.pathname ||
      scrollPosition !== nextProps.scrollPosition
    );
  }

  renderChildren() {
    const { activeTab } = this.props;
    if (activeTab === 'social') {
      return <SocialGraphPageContainer/>;
    }
    return <SummaryPageContainer/>;
  }

  render() {
    const { officerName, activeTab, pathname, scrollPosition } = this.props;

    return (
      <div>
        <ShareableHeaderContainer/>
        <Header
          officerName={ officerName }
          activeTab={ activeTab }
          pathname={ pathname }
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
  activeTab: PropTypes.string,
  pathname: PropTypes.string,
  scrollPosition: PropTypes.string,
};

OfficerPage.defaultProps = {
  pathname: '/',
  scrollPosition: 'top',
};
