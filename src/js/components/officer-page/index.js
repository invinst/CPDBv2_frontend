import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import TimelinePage from './timeline-page';
import { pageWrapperStyle, headerStyle } from './officer-page.style';
import StickyHeader from 'components/common/sticky-header';


export default class OfficerPage extends Component {
  componentDidMount() {
    const { fetchOfficerSummary, officerId } = this.props;
    fetchOfficerSummary(officerId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchOfficerSummary, officerId } = nextProps;
    if (officerId !== this.props.officerId) {
      fetchOfficerSummary(officerId);
    }
  }

  renderContent() {
    const { location, officerId } = this.props;
    const parts = location.pathname.split('/');
    const path = parts[parts.length - 2];
    if (path === 'timeline') {
      return <TimelinePage officerId={ officerId }/>;
    }
    return <SummaryPageContainer officerId={ officerId }/>;
  }

  render() {
    const { location, officerName } = this.props;
    const { pathname } = location;

    return (
      <div>
        <StickyHeader style={ headerStyle }>
          <Header officerName={ officerName } pathname={ pathname }/>
        </StickyHeader>
        <div style={ pageWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  fetchOfficerSummary: PropTypes.func,
  location: PropTypes.object,
  officerName: PropTypes.string,
  officerId: PropTypes.number
};

OfficerPage.defaultProps = {
  location: { pathname: '/' },
  fetchOfficerSummary: () => {}
};
