import React, { Component, PropTypes } from 'react';

import MoreLink from 'components/common/more-link';
import {
  moreLinkWrapperStyle, editLinkBaseStyle, editLinkHoverStyle,
  editLinkUnderlineBaseStyle, editLinkUnderlineHoverStyle, buttonStyle
} from './edit-toggle.style';


class EditToggle extends Component {
  render() {
    const { turnOnSectionEditMode, turnOffSectionEditMode, onSaveForm, sectionEditModeOn } = this.props;
    const { editModeOn } = this.context;

    if (!editModeOn) {
      return null;
    }

    return (
      <div style={ moreLinkWrapperStyle }>
        {
          !sectionEditModeOn ?
            <MoreLink
              style={ {
                base: { base: editLinkBaseStyle, hover: editLinkHoverStyle },
                underline: { base: editLinkUnderlineBaseStyle, hover: editLinkUnderlineHoverStyle }
              } }
              onClick={ turnOnSectionEditMode }>
              Edit
            </MoreLink> :
            <div>
              <a onClick={ turnOffSectionEditMode } style={ buttonStyle }>Cancel</a>
              <a style={ buttonStyle } onClick={ onSaveForm }>Update</a>
            </div>
        }
      </div>
    );
  }
}

EditToggle.propTypes = {
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  onSaveForm: PropTypes.func
};

EditToggle.contextTypes = {
  editModeOn: PropTypes.bool
};

export default EditToggle;
