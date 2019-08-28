import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isUndefined } from 'lodash';

import styles from './editable-tags-input.sass';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTagEditable from 'components/inline-editable/editable-section/simple-tag-editable';


export default class EditableTagsInput extends Component {
  render() {
    const { className, title, editWrapperStateProps, fieldName, nextDocumentId } = this.props;
    const hasNextUntaggedDocument = !isUndefined(nextDocumentId);
    const hoverableClassName = hasNextUntaggedDocument ? styles.hasNextUntaggedDocument : '';
    return (
      <div className={ cx(styles.editableTagsInput, className) }>
        <div className='editable-tags-title'>{ title }</div>
        <EditWrapperStateProvider { ...editWrapperStateProps }>
          <HoverableEditWrapper className={ hoverableClassName }>
            <SimpleTagEditable fieldName={ fieldName } />
          </HoverableEditWrapper>
        </EditWrapperStateProvider>
        {
          hasNextUntaggedDocument && (
            <a className='next-untagged-document-button' href={ `/document/${nextDocumentId}/` }>
              Next untagged document
            </a>
          )
        }
      </div>
    );
  }
}

EditableTagsInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  fieldName: PropTypes.string,
  editWrapperStateProps: PropTypes.object,
  nextDocumentId: PropTypes.number,
};
