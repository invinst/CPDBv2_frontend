import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import styles from './document-card.sass';
import * as GATracking from 'utils/google_analytics_tracking';


export default class DocumentCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { crid, pathname } = this.props;
    const url = `/complaint/${crid}/`;
    GATracking.trackAttachmentClick(pathname, url);
  }

  render() {
    const { numDocuments, previewImageUrl, crid } = this.props;
    return (
      <Link
        className={ styles.documentCard }
        to={ `/complaint/${crid}/` }
        onClick={ this.handleClick }
      >
        <div className='document-card-thumbnail'>
          <img className='document-card-thumbnail-img' src={ previewImageUrl } alt='Document preview image'/>
        </div>
        <div className='document-card-description'>
          { pluralize('new attachment', numDocuments, true) } added to CR { crid }
        </div>
      </Link>
    );
  }
}

DocumentCard.propTypes = {
  numDocuments: PropTypes.number,
  previewImageUrl: PropTypes.string,
  url: PropTypes.string,
  crid: PropTypes.string,
  pathname: PropTypes.string,
};
