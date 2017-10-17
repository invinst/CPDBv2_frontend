import React, { PropTypes } from 'react';

import {
  labelIconStyle,
  labelsWrapperStyle,
  blankIconStyle,
  labelStyle,
  sublabelStyle
} from './labeled-icon.style.js';

class LabeledIcon extends React.Component {
  render() {
    const { label, sublabel, hovering } = this.props;
    return (
      <div style={ labelIconStyle }>
        <span style={ blankIconStyle } />
        <div style={ labelsWrapperStyle }>
          <span style={ labelStyle(hovering) }>{ label }</span><br />
          <span style={ sublabelStyle(hovering) }>{ sublabel }</span>
        </div>
      </div>
    );
  }
}

LabeledIcon.propTypes = {
  label: PropTypes.string,
  sublabel: PropTypes.string,
  hovering: PropTypes.bool
};

export default LabeledIcon;
