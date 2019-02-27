import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Counter from './counter';
import CRLink from './cr-link';
import styles from './document-row.sass';

export default class DocumentRow extends Component {
  handleClick(id) {
    browserHistory.push(`/tracker/document/${id}/`);
  }

  render() {
    const {
      id,
      thumbnail,
      title,
      source,
      date,
      viewsCount,
      downloadsCount,
      crid,
      documentsCount,
      onCRLinkClick
    } = this.props;

    return (
      <div
        onClick={ this.handleClick.bind(this, id) }
        className={ styles.row }>
        <span
          className='document-thumbnail'
          style={ thumbnail ? {
            backgroundImage: `url(${thumbnail})`
          } : null }/>
        <span className='document-title'>
          { title }
        </span>
        <span className='document-crid-uid'>
          <CRLink
            crid={ crid }
            documentsCount={ documentsCount }
            onCRLinkClick={ onCRLinkClick }
          />
        </span>
        <span className='document-source'>
          { source }
        </span>
        <span className='document-counts'>
          <Counter
            viewsCount={ viewsCount }
            downloadsCount={ downloadsCount } />
        </span>
        <span className='document-date'>
          { date }
        </span>
      </div>
    );
  }
}

DocumentRow.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.string,
  date: PropTypes.string,
  viewsCount: PropTypes.number,
  downloadsCount: PropTypes.number,
  crid: PropTypes.string,
  documentsCount: PropTypes.number,
  onCRLinkClick: PropTypes.func
};
