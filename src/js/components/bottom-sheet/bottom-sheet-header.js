import React, { Component, PropTypes } from 'react';

import ButtonComponent from 'components/common/button';
import { headerStyle } from './bottom-sheet-header.style';


class BottomSheetHeader extends Component {
  render() {
    const { onDismissClick } = this.props;

    return (
      <div style={ headerStyle }>
        <ButtonComponent onClick={ onDismissClick }>Dismiss</ButtonComponent>
      </div>
    );
  }
}

BottomSheetHeader.propTypes = {
  onDismissClick: PropTypes.func
};

export default BottomSheetHeader;
