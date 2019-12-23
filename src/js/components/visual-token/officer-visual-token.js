import React, { PropTypes } from 'react';

import { wrapperStyle, backgroundStyle } from './officer-visual-token.style';


export default function OfficerVisualToken(props) {
  const { backgroundColor, style } = props;
  return (
    <div className='test--officer-visual-token' style={ { ...wrapperStyle, ...style } }>
      <div className='test--officer-visual-token-background' style={ backgroundStyle(backgroundColor) }/>
    </div>
  );
}

OfficerVisualToken.propTypes = {
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
