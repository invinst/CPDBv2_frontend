import React, { PropTypes } from 'react';

import { closeButtonStyle } from './close-btn.style';


export default function CloseButton(props) {
  return (
    <button
      style={ closeButtonStyle }
      className={ props.className }
      onClick={ props.onClick }
    />
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
