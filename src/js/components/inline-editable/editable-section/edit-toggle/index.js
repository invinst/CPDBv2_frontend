import PropTypes from 'prop-types';
import React from 'react';

import MoreLink from 'components/common/more-link';
import CancelUpdateButtons from './cancel-update-buttons';
import {
  moreLinkWrapperStyle, editLinkBaseStyle, editLinkHoverStyle,
  editLinkUnderlineBaseStyle, editLinkUnderlineHoverStyle,
} from './edit-toggle.style';


function EditToggle(props) {
  const { turnOnSectionEditMode, turnOffSectionEditMode, onSaveForm, sectionEditModeOn, style } = props;
  const { editModeOn } = this.context;

  if (!editModeOn) {
    return null;
  }

  return (
    <div className='test--edit-toggle' style={ { ...moreLinkWrapperStyle, ...style } }>
      {
        !sectionEditModeOn ?
          <MoreLink
            style={ {
              base: { base: editLinkBaseStyle, hover: editLinkHoverStyle },
              underline: { base: editLinkUnderlineBaseStyle, hover: editLinkUnderlineHoverStyle },
            } }
            onClick={ turnOnSectionEditMode }>
            Edit
          </MoreLink> :
          <CancelUpdateButtons
            onUpdateClick={ onSaveForm }
            onCancelClick={ turnOffSectionEditMode }/>
      }
    </div>
  );
}

EditToggle.propTypes = {
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
  onSaveForm: PropTypes.func,
  style: PropTypes.object,
};

EditToggle.contextTypes = {
  editModeOn: PropTypes.bool,
};

export default EditToggle;
