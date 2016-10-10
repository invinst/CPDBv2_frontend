import React, { Component, PropTypes } from 'react';

import ButtonComponent from './button';
import { headerStyle } from './bottom-sheet-header.style';


class BottomSheetHeader extends Component {
  render() {
    const { onDismissClick } = this.props;

    return (
      <div style={ headerStyle }>
        <ButtonComponent className='bottom-sheet__back-btn' onClick={ onDismissClick }>Back</ButtonComponent>
      </div>
    );
  }
}

BottomSheetHeader.propTypes = {
  onDismissClick: PropTypes.func
};

export default BottomSheetHeader;
