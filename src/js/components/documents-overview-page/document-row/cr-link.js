import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import styles from './cr-link.sass';


export default class CRLink extends Component {
  handleClick(crid, event) {
    const { onCRLinkClick } = this.props;
    event.stopPropagation();
    onCRLinkClick(crid);
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
          <span className='documents-count'>
            { `${documentsCount} ${pluralize('document', documentsCount)}` }
          </span>
        </span>
      </span>
    );
  }
}

CRLink.propTypes = {
  crid: PropTypes.string,
  documentsCount: PropTypes.number,
  onCRLinkClick: PropTypes.func,
};
