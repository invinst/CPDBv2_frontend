import React, { PropTypes, Component } from 'react';

import { panelStyle } from './summary-panel.style';
import Neighborhood from './neighborhood';
import NoNeighborhood from './no-neighborhood';


export default class SummaryPanel extends Component {
  render() {
    const { neighborhood } = this.props;

    return (
      <div style={ panelStyle }>
        {
          this.props.neighborhood ? <Neighborhood neighborhood={ neighborhood }/> : <NoNeighborhood/>
        }
      </div>
    );
  }
}

SummaryPanel.propTypes = {
  neighborhood: PropTypes.object
};
