import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { isUndefined } from 'lodash';

import styles from './editable-tags-input.sass';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTagEditable from 'components/inline-editable/editable-section/simple-tag-editable';


export default function EditableTagsInput(props) {
  const {
    className,
    title,
    editWrapperStateProps,
    fieldName, nextDocumentId,
    errorMessages,
    suggestionTags,
  } = props;
  const hasNextUntaggedDocument = !isUndefined(nextDocumentId);
  const hoverableClassName = hasNextUntaggedDocument ? styles.hasNextUntaggedDocument : '';
  return (
    <div className={ cx(styles.editableTagsInput, className) }>
      <div className='editable-tags-title'>{ title }</div>
      <EditWrapperStateProvider { ...editWrapperStateProps }>
        <HoverableEditWrapper className={ hoverableClassName }>
          <SimpleTagEditable fieldName={ fieldName } suggestionTags={ suggestionTags } />
        </HoverableEditWrapper>
      </EditWrapperStateProvider>
      {
        hasNextUntaggedDocument && (
          <a className='next-untagged-document-button' href={ `/document/${nextDocumentId}/` }>
            Next untagged document
          </a>
        )
      }
      {
        errorMessages && (
          <div className='error-messages'>
            { errorMessages.join(' ') }
          </div>
        )
      }
    </div>
  );
}

EditableTagsInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  fieldName: PropTypes.string,
  editWrapperStateProps: PropTypes.object,
  nextDocumentId: PropTypes.number,
  errorMessages: PropTypes.array,
  suggestionTags: PropTypes.array,
};
