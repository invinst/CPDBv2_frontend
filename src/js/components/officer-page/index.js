import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import { pageWrapperStyle, headerStyle } from './officer-page.style';
import StickyHeader from 'components/common/sticky-header';


export default class OfficerPage extends Component {
  render() {
    const { location, officerName, officerId } = this.props;
    const { pathname } = location;

    return (
      <div>
        <StickyHeader style={ headerStyle }>
          <Header officerName={ officerName } pathname={ pathname }/>
        </StickyHeader>
        <div style={ pageWrapperStyle }>
          <SummaryPageContainer officerId={ officerId }/>
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  location: PropTypes.object,
  officerName: PropTypes.string,
  officerId: PropTypes.number
};

OfficerPage.defaultProps = {
  location: { pathname: '/' }
};
