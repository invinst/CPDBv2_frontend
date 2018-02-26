import React, { PropTypes } from 'react';

import { headerStyle, headerTextStyle } from './inline-header-section.style';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';

// TODO: change it constants.js
const ALLOW_TYPES = ['complaint', 'allegation', 'document', 'activity'];

const HeaderSection = ({ type, editWrapperStateProps }) => {
  if (ALLOW_TYPES.indexOf(type) === -1)
    return <div/>;

  return <EditWrapperStateProvider { ...editWrapperStateProps }>
    <HoverableEditWrapper>
      <h3 style={ headerStyle }>
        <LinkTextEditable
          placeholder='Title'
          fieldname={ `carousel_${type}_title` }
        />
      </h3>
      <div style={ headerTextStyle }>
        <RichTextEditable
          placeholder='Description'
          fieldname={ `carousel_${type}_desc` }
        />
      </div>
    </HoverableEditWrapper>
  </EditWrapperStateProvider>;
};

HeaderSection.propTypes = {
  type: PropTypes.string,
  editWrapperStateProps: PropTypes.object
};

export default HeaderSection;
