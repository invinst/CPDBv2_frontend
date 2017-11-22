import React, { PropTypes, Component } from 'react';

import { getSvgUrl } from 'utils/visual-token';
import { wrapperStyle, imgStyle, backgroundStyle } from './officer-visual-token.style';


export default class OfficerVisualToken extends Component {

  render() {
    const { officerId, backgroundColor, style } = this.props;
    const svgUrl = getSvgUrl(officerId);
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
