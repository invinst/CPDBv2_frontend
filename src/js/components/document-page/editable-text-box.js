import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './editable-text-box.sass';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';


export default class EditableTextBox extends Component {
  render() {
    const { className, title, text, multiline, editWrapperStateProps } = this.props;
    return (
      <div className={ cx(styles.editableTextBox, className) }>
        <div className='editable-text-box-title'>{ title }</div>
        { multiline ? (
          <MinimalScrollBars style={ { container: { height: 669 }, view: { backgroundColor: 'white' } } }>
            <div className={ cx('editable-text-box-text', { multiline: true }) }>{ text }</div>
          </MinimalScrollBars>
        ) : (
          <EditWrapperStateProvider { ...editWrapperStateProps } simple={ true }>
            <HoverableEditWrapper>
              <SimpleTextEditable
                className={ cx('editable-text-box-text', { multiline: false }) }
                placeholder='Title'
                fieldname='title'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
        )}
      </div>
    );
  }
}

EditableTextBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  multiline: PropTypes.bool,
  editWrapperStateProps: PropTypes.object,
};

EditableTextBox.defaultProps = {
  multiline: false,
};
