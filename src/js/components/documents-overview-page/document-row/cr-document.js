import React, { Component, PropTypes } from 'react';

import styles from './cr-document.sass';


export default class CRDocument extends Component {
  handleClick(crid, event) {
    event.stopPropagation();
    window.open(`/documents/?crid=${crid}`, '_blank');
  }

  render() {
    const { crid, documentsCount } = this.props;

    return (
      <span
        className={ styles.wrapper }
        onClick={ this.handleClick.bind(this, crid) }>
        <span className='document-crid'>{ `CR ${crid}` }</span>
        <span className='document-count-wrapper'>
          <span className='link-icon' />
          <span className='documents-count'>{ `${documentsCount} documents` }</span>
        </span>
      </span>
    );
  }
}

CRDocument.propTypes = {
  crid: PropTypes.string,
  documentsCount: PropTypes.number
};
