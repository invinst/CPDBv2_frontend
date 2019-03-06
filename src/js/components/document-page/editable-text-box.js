import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './editable-text-box.sass';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import SimpleEditWrapperStateProvider from 'components/inline-editable/simple-edit-wrapper-state-provider';
import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';


export default class EditableTextBox extends Component {
  render() {
    const { className, title, multiline, editWrapperStateProps, fieldName } = this.props;
    const { sectionEditModeOn } = editWrapperStateProps;
    return (
      <div className={ cx(styles.editableTextBox, className) }>
        <div className='editable-text-box-title'>{ title }</div>
        <SimpleEditWrapperStateProvider { ...editWrapperStateProps }>
          <HoverableEditWrapper>
            { multiline ? (
              <div className='editable-text-box-scroll-container'>
                <MinimalScrollBars
                  showThumb={ !sectionEditModeOn }
                  viewClassName='editable-text-box-scroll-view'
                >
                  <SimpleTextEditable
                    className='editable-text-box-text-multiline'
                    placeholder={ title }
                    fieldName={ fieldName }
                  />
                </MinimalScrollBars>
              </div>
            ) : (
              <SimpleTextEditable
                className='editable-text-box-text'
                placeholder={ title }
                fieldName={ fieldName }
              />
            )}
          </HoverableEditWrapper>
        </SimpleEditWrapperStateProvider>
      </div>
    );
  }
}

EditableTextBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  multiline: PropTypes.bool,
  fieldName: PropTypes.string,
  editWrapperStateProps: PropTypes.object,
};

EditableTextBox.defaultProps = {
  multiline: false,
};
