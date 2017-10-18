import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import TimelinePage from './timeline-page';
import { pageWrapperStyle } from './officer-page.style';


export default class OfficerPage extends Component {
  renderChildren() {
    const { activeTab } = this.props;
    if (activeTab === 'timeline') {
      return <TimelinePage/>;
    }
    return <SummaryPageContainer/>;
  }

  render() {
    const { officerName, activeTab, pathname } = this.props;

    return (
      <div>
        <Header officerName={ officerName } activeTab={ activeTab } pathname={ pathname }/>
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
};

OfficerPage.defaultProps = {
  pathname: '/'
};
