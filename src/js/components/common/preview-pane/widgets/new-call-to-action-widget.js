import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './new-call-to-action-widget.sass';


export default function NewCallToActionWidget(props) {
  const { text, customClassName } = props;

  return (
    <div className={ cx(styles.newCallToActionWidget, customClassName) }>
      <span className='new-call-to-action-widget-text'>{ text }</span>
      <div className='new-call-to-action-widget-button'/>
    </div>
  );
}

NewCallToActionWidget.defaultProps = {
  text: 'View on the Data Tool',
};

NewCallToActionWidget.propTypes = {
  text: PropTypes.string,
  customClassName: PropTypes.string,
};
