import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './log-file-modal-content.sass';


export default class LogFileModalContent extends Component {
  handleClick = () => {
    this.props.closeModal();
  };

  render() {
    const { logUrl, crawlerName, recentRunAt } = this.props.crawler;

    return (
      <div className={ styles.logFileModal }>
        <div className='log-file-close-button' onClick={ this.handleClick } />
        <div className='modal-title'>{ `${crawlerName} - ${recentRunAt}` }</div>
        <embed src={ logUrl } className='embed-content'/>
      </div>

    );
  }
}


LogFileModalContent.propTypes = {
  crawler: PropTypes.object,
  closeModal: PropTypes.func,
};
