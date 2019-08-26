import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './new-call-to-action-widget.sass';


export default class NewCallToActionWidget extends Component {
  render() {
    const { text, customClassName } = this.props;

    return (
      <div className={ cx(styles.newCallToActionWidget, customClassName) }>
        <span className='new-call-to-action-widget-text'>{ text }</span>
        <div className='new-call-to-action-widget-button'/>
      </div>
    );
  }
}

NewCallToActionWidget.defaultProps = {
  text: 'View on the Data Tool',
};

NewCallToActionWidget.propTypes = {
  text: PropTypes.string,
  customClassName: PropTypes.string,
};
