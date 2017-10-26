import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';
import { pageWrapperStyle } from './unit-profile-page.style';


export default class UnitProfilePage extends Component {
  render() {
    const { location, unitName } = this.props;
    const { pathname } = location;

    return (
      <div>
        <Header unitName={ unitName } pathname={ pathname }/>
        <div style={ pageWrapperStyle }>
          <SummaryPageContainer unitName={ unitName }/>;
        </div>
      </div>
    );
  }
}

UnitProfilePage.propTypes = {
  location: PropTypes.object,
  unitName: PropTypes.string
};

UnitProfilePage.defaultProps = {
  location: { pathname: '/' }
};
