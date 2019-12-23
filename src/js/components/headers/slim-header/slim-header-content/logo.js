import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';
import cx from 'classnames';

import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import { editMode } from 'utils/edit-path';
import styles from 'components/headers/slim-header/slim-header-content/logo.sass';
import { ROOT_PATH } from 'utils/constants';

function Logo(props) {
  const { editModeOn } = this.context;
  const { position, editWrapperStateProps } = props;
  const titleLink = editModeOn ? editMode(ROOT_PATH) : ROOT_PATH;

  return (
    <EditWrapperStateProvider { ...editWrapperStateProps }>
      <HoverableEditWrapper className={ cx(styles.logo, position) }>
        <MediaQuery minWidth={ 830 }>
          { (matches) => (
            matches
              ? (
                <LinkTextEditable
                  className='header-logo-title'
                  placeholder='Title'
                  to={ titleLink }
                  fieldname='navbar_title'
                />
              )
              : (
                <Link
                  to={ titleLink }
                  className='header-logo-title'
                >
                  CPDP
                </Link>
              )
          ) }
        </MediaQuery>
        <MediaQuery minWidth={ 950 }>
          <RichTextEditable
            className='header-logo-subtitle'
            placeholder='Subtitle'
            fieldname='navbar_subtitle'
          />
        </MediaQuery>
      </HoverableEditWrapper>
    </EditWrapperStateProvider>
  );
}

Logo.propTypes = {
  style: PropTypes.object,
  position: PropTypes.string,
  editWrapperStateProps: PropTypes.object,
};

Logo.defaultProps = {
  style: {},
};

Logo.contextTypes = {
  editModeOn: PropTypes.bool,
};

export default Logo;
