import React, { PropTypes, Component } from 'react';

import config from 'config';
import { wrapperStyle, imgStyle, backgroundStyle } from './officer-visual-token.style';


export default class OfficerVisualToken extends Component {
  getSvgUrl(officerId) {
    return `https://${config.visualTokenAccount}.blob.core.windows.net/visual-token/officer_${officerId}.svg`;
  }

  render() {
    const { officerId, backgroundColor, width, height } = this.props;
    const svgUrl = this.getSvgUrl(officerId);
    return (
      <div style={ wrapperStyle(width, height) }>
        <div style={ backgroundStyle(backgroundColor) }/>
        <img style={ imgStyle } src={ svgUrl } width={ width } height={ height }/>
      </div>
    );
  }
}

OfficerVisualToken.propTypes = {
  officerId: PropTypes.number,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};
