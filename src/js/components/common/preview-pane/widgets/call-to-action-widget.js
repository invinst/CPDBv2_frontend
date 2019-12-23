import PropTypes from 'prop-types';
import React from 'react';

import { containerStyle, buttonStyle, textStyle } from './view-widget.style';


export default function CallToActionWidget(props) {
  const { text } = props;

  return (
    <div style={ containerStyle }>
      <span style={ textStyle }>{ text }</span>
      <div style={ buttonStyle }>→</div>
    </div>
  );
}

CallToActionWidget.defaultProps = {
  text: 'View on the Data Tool',
};

CallToActionWidget.propTypes = {
  text: PropTypes.string,
};
