import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import browserHistory from 'utils/history';
import Counter from './counter';
import CRLink from './cr-link';
import styles from './document-row.sass';
import { ATTACHMENT_TYPES } from 'utils/constants';
import { trackOutboundLink } from 'utils/tracking';

export default class DocumentRow extends Component {
  handleClick = () => {
    const { id, fileType, url } = this.props;
    if (fileType === ATTACHMENT_TYPES.DOCUMENT)
      browserHistory.push(`/document/${id}/`);
    else
      trackOutboundLink(url, '_blank');
  };

  render() {
    const {
      thumbnail,
      title,
      source,
      date,
      viewsCount,
      downloadsCount,
      crid,
      documentsCount,
      onCRLinkClick,
      editModeOn,
    } = this.props;

    return (
      <div
        onClick={ this.handleClick }
        className={ cx(styles.row, { 'edit-mode': editModeOn }) }>
        <span
          className='document-thumbnail'
          style={ thumbnail ? {
            backgroundImage: `url(${thumbnail})`,
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
  onCRLinkClick: PropTypes.func,
  editModeOn: PropTypes.bool,
  fileType: PropTypes.string,
  url: PropTypes.string,
};
