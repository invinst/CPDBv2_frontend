import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';

import EditableSection from 'components/inline-editable/editable-section';
import SectionWrapper from 'components/inline-editable/section-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import { editMode } from 'utils/edit-path';
import { wrapperStyle, titleStyle, subtitleStyle } from './logo.style';
import { ROOT_PATH } from 'utils/constants';

class Logo extends Component {
  render() {
    const { editModeOn } = this.context;
    const { editToggleProps, fieldProps, position } = this.props;
    const titleLink = editModeOn ? editMode(ROOT_PATH) : ROOT_PATH;
    return (
      <div style={ wrapperStyle[position] }>
        <SectionWrapper { ...editToggleProps }>
          <MediaQuery minWidth={ 830 }>
            { (matches) => (
              matches
                ? <LinkTextEditable
                  style={ titleStyle[position] }
                  className='test--header-logo'
                  placeholder='Title'
                  to={ titleLink }
                  { ...fieldProps['navbar_title'] }
                  />
                : <Link
                  style={ titleStyle[position] }
                  to={ titleLink }
                  className='test--header-logo'>
                    CPDP
                  </Link>
            ) }
          </MediaQuery>
          <MediaQuery minWidth={ 950 }>
            <RichTextEditable
              style={ subtitleStyle[position] }
              placeholder='Subtitle'
              { ...fieldProps['navbar_subtitle'] }
              />
          </MediaQuery>
        </SectionWrapper>
      </div>
    );
  }
}

Logo.propTypes = {
  editToggleProps: PropTypes.object,
  style: PropTypes.object,
  position: PropTypes.string,
  fieldProps: PropTypes.object
};

Logo.defaultProps = {
  style: {}
};

Logo.contextTypes = {
  editModeOn: PropTypes.bool
};

export default EditableSection(Logo);
