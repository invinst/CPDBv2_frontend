import React, { PropTypes, Component } from 'react';

import { panelStyle } from './summary-panel.style';
import Community from './community';
import NoCommunity from './no-community';


export default class SummaryPanel extends Component {
  render() {
    const { community } = this.props;

    return (
      <div style={ panelStyle }>
        {
          community ? <Community community={ community }/> : <NoCommunity/>
        }
      </div>
    );
  }
}

SummaryPanel.propTypes = {
  community: PropTypes.object
};
