import React, { Component, PropTypes } from 'react';
import styles from './editable-text-box.sass';
import cx from 'classnames';

export default class EditableTextBox extends Component {
  render() {
    const { className, title, text, multiline } = this.props;

    return (
      <div className={ cx(styles.editableTextBox, className) }>
        <div className='editable-text-box-title'>{ title }</div>
        <div className={ cx('editable-text-box-text', { multiline }) }>{ text }</div>
      </div>
    );
  }
}

EditableTextBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  multiline: PropTypes.bool,
};

EditableTextBox.defaultProps = {
  multiline: false,
};
