import React, { Component, PropTypes } from 'react';

import {
  contentStyle,
  rowStyle,
  titleStyle,
  wrapperStyle
} from './simple-marker-tooltip.style';


export default class SimpleMarkerTooltip extends Component {

  render() {
    const { kind, id, category } = this.props;
    return (
      <div style={ wrapperStyle } className='test--marker-tooltip'>
        <div style={ rowStyle }>
          <div className='test--marker-tooltip-kind-id' style={ titleStyle }>
            { kind } { id }
          </div>
          <div className='test--marker-tooltip-category' style={ contentStyle }>
            { category }
          </div>
        </div>
      </div>
    );
  }
}

SimpleMarkerTooltip.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
};
