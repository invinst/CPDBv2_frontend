import React, { Component, PropTypes } from 'react';

import styles from './new-call-to-action-widget.sass';


export default class NewCallToActionWidget extends Component {
  render() {
    const { text } = this.props;

    return (
      <div className={ styles.newCallToActionWidget }>
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
};
