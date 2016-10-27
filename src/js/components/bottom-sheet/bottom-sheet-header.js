import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  headerWrapperStyle, editWrapperLinkStyle
} from './bottom-sheet.style';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';


class BottomSheetHeader extends Component {
  render() {
    const { editToggleProps } = this.props;

    return (
      <div style={ headerWrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div>
            <EditToggle
              { ...editToggleProps }
              style={ editWrapperLinkStyle }/>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

BottomSheetHeader.propTypes = {
  editToggleProps: PropTypes.object
};

export default BottomSheetHeader;
