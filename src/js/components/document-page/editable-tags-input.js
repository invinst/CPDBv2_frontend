import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './editable-tags-input.sass';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTagEditable from 'components/inline-editable/editable-section/simple-tag-editable';


export default class EditableTagsInput extends Component {
  render() {
    const { className, title, editWrapperStateProps, fieldName, errorMessages } = this.props;
    return (
      <div className={ cx(styles.editableTagsInput, className) }>
        <div className='editable-tags-title'>{ title }</div>
        <EditWrapperStateProvider { ...editWrapperStateProps }>
          <HoverableEditWrapper>
            <SimpleTagEditable fieldName={ fieldName }/>
          </HoverableEditWrapper>
        </EditWrapperStateProvider>
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
}

EditableTagsInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  fieldName: PropTypes.string,
  editWrapperStateProps: PropTypes.object,
  errorMessages: PropTypes.array,
};
