import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';


export default class OfficerPage extends Component {
  render() {
    const { location, officerName, officerId } = this.props;
    const { pathname } = location;

    return (
      <div>
        <Header officerName={ officerName } pathname={ pathname }/>
        <SummaryPageContainer officerId={ officerId }/>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  location: PropTypes.object,
  officerName: PropTypes.string,
  officerId: PropTypes.number
};
