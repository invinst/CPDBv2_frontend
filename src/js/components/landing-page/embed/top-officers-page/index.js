import React, { Component } from 'react';

import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import { carouselStyle } from './top-officers-page.style';
import { showIntercomLauncher } from 'utils/intercom';


class EmbedTopOfficersPage extends Component {
  componentDidMount() {
    showIntercomLauncher(false);
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
  }

  render() {
    return (
      <div style={ carouselStyle }>
        <OfficersByAllegationContainer openCardInNewPage={ true } pinnable={ false }/>
      </div>
    );
  }
}

export default EmbedTopOfficersPage;

