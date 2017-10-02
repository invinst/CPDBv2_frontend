import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  headerWrapperStyle, editWrapperLinkStyle
} from './bottom-sheet-header.style';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';


class BottomSheetHeader extends Component {
  render() {
    const { editToggleProps } = this.props;

    return (
      <div style={ headerWrapperStyle }>
        <ResponsiveFluidWidthComponent>
          <div>
            <EditToggle
              { ...editToggleProps }
              style={ editWrapperLinkStyle }/>
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

BottomSheetHeader.propTypes = {
  editToggleProps: PropTypes.object
};

export default BottomSheetHeader;
