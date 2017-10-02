import React, { PropTypes, Component } from 'react';

import config from 'config';
import { wrapperStyle, imgStyle, backgroundStyle } from './officer-visual-token.style';


export default class OfficerVisualToken extends Component {
  getSvgUrl(officerId) {
    return `https://${config.visualTokenAccount}.blob.core.windows.net/visual-token/officer_${officerId}.svg`;
  }

  render() {
    const { officerId, backgroundColor, style } = this.props;
    const svgUrl = this.getSvgUrl(officerId);
    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div style={ backgroundStyle(backgroundColor) }/>
        <img style={ imgStyle } src={ svgUrl }/>
      </div>
    );
  }
}

OfficerVisualToken.propTypes = {
  officerId: PropTypes.number,
  backgroundColor: PropTypes.string,
  style: PropTypes.object
};
