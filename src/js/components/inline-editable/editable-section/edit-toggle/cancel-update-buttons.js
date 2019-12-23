import PropTypes from 'prop-types';
import React from 'react';

import { buttonStyle, hoverButtonStyle } from './cancel-update-buttons.style';
import HoverableButton from 'components/common/hoverable-button';


function CancelUpdateButtons(props) {
  const { onCancelClick, onUpdateClick } = props;
  const style = {
    base: buttonStyle,
    hover: hoverButtonStyle,
  };

  return (
    <div>
      <HoverableButton
        className='cancel-button'
        onClick={ onCancelClick }
        style={ style }>
        Cancel
      </HoverableButton>
      <HoverableButton
        className='update-button'
        onClick={ onUpdateClick }
        style={ style }>
        Update
      </HoverableButton>
    </div>
  );
}

CancelUpdateButtons.propTypes = {
  onCancelClick: PropTypes.func,
  onUpdateClick: PropTypes.func,
};

export default CancelUpdateButtons;
