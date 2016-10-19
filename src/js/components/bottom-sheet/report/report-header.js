import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  leftHeaderStyle, rightHeaderStyle, headerWrapperStyle, editWrapperLinkStyle
} from './report.style';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';


class ReportHeader extends Component {
  render() {
    const { editToggleProps } = this.props;

    return (
      <div style={ headerWrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ leftHeaderStyle }>
          </div>
          <div style={ rightHeaderStyle }>
            <EditToggle
              { ...editToggleProps }
              style={ editWrapperLinkStyle }/>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

ReportHeader.propTypes = {
  editToggleProps: PropTypes.object
};

export default ReportHeader;
