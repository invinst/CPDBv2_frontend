import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';

import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import { editMode } from 'utils/edit-path';
import { wrapperStyle, titleStyle, subtitleStyle } from './logo.style';
import { ROOT_PATH } from 'utils/constants';

class Logo extends Component {
  render() {
    const { editModeOn } = this.context;
    const { position, editWrapperStateProps } = this.props;
    const titleLink = editModeOn ? editMode(ROOT_PATH) : ROOT_PATH;

    return (
      <EditWrapperStateProvider { ...editWrapperStateProps }>
        <HoverableEditWrapper style={ wrapperStyle[position] }>
          <MediaQuery minWidth={ 830 }>
            { (matches) => (
              matches
                ? (
                  <LinkTextEditable
                    style={ titleStyle[position] }
                    className='test--header-logo-title'
                    placeholder='Title'
                    to={ titleLink }
                    fieldname='navbar_title'
                  />
                )
                : (
                  <Link
                    style={ titleStyle[position] }
                    to={ titleLink }
                    className='test--header-logo-title'>
                    CPDP
                  </Link>
                )
            ) }
          </MediaQuery>
          <MediaQuery minWidth={ 950 }>
            <RichTextEditable
              style={ subtitleStyle[position] }
              className='test--header-logo-subtitle'
              placeholder='Subtitle'
              fieldname='navbar_subtitle'
              />
          </MediaQuery>
        </HoverableEditWrapper>
      </EditWrapperStateProvider>
    );
  }
}

Logo.propTypes = {
  style: PropTypes.object,
  position: PropTypes.string,
  editWrapperStateProps: PropTypes.object
};

Logo.defaultProps = {
  style: {}
};

Logo.contextTypes = {
  editModeOn: PropTypes.bool
};

export default Logo;
