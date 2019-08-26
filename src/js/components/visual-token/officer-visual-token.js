import React, { PropTypes, Component } from 'react';

import { wrapperStyle, backgroundStyle } from './officer-visual-token.style';


export default class OfficerVisualToken extends Component {

  render() {
    const { backgroundColor, style } = this.props;
    return (
      <div className='test--officer-visual-token' style={ { ...wrapperStyle, ...style } }>
        <div className='test--officer-visual-token-background' style={ backgroundStyle(backgroundColor) }/>
      </div>
    );
  }
}

OfficerVisualToken.propTypes = {
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
