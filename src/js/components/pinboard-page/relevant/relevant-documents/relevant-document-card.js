import React, { PropTypes, Component } from 'react';

import styles from './relevant-document-card.sass';
import BaseComplaintCard from 'components/pinboard-page/relevant/base-complaint-card';


export class RelevantDocumentCard extends Component {
  render() {
    const {
      allegation,
      url,
      previewImageUrl,
    } = this.props;

    const leftChild = (
      <a
        className={ styles.documentCardThumbnail }
        href={ url }
        target='_blank'
      >
        <img className='document-card-thumbnail-img' src={ previewImageUrl } alt='Document preview image'/>
      </a>
    );

    return <BaseComplaintCard { ...allegation } leftChild={ leftChild } />;
  }
}

RelevantDocumentCard.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  allegation: PropTypes.object,
};

export default RelevantDocumentCard;
