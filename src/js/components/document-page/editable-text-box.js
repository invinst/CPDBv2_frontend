import React, { Component, PropTypes } from 'react';
import styles from './editable-text-box.sass';
import cx from 'classnames';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


export default class EditableTextBox extends Component {
  render() {
    const { className, title, text, multiline } = this.props;

    return (
      <div className={ cx(styles.editableTextBox, className) }>
        <div className='editable-text-box-title'>{ title }</div>
        { multiline ? (
          <MinimalScrollBars style={ { container: { height: 669 }, view: { backgroundColor: 'white' } } }>
            <div className={ cx('editable-text-box-text', { multiline: true }) }>{ text }</div>
          </MinimalScrollBars>
        ) : (
          <div className={ cx('editable-text-box-text', { multiline: false }) }>{ text }</div>
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
};

EditableTextBox.defaultProps = {
  multiline: false,
};
