import React, { PropTypes, Component } from 'react';

import styles from './relevant-document-card.sass';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';


export class RelevantDocumentCard extends Component {
  render() {
    const {
      allegation,
      url,
      previewImageUrl,
      addItemInPinboardPage,
      pinned,
    } = this.props;

    const leftChild = (
      <a
        className={ styles.documentCardThumbnail }
        href={ url }
        target='_blank'
      >
        <img className='document-card-thumbnail-img' src={ previewImageUrl }/>
      </a>
    );

    return (
      <BaseComplaintCard
        { ...allegation }
        leftChild={ leftChild }
        addItemInPinboardPage={ pinned ? null : addItemInPinboardPage }
        pinned={ pinned }
        fadePlusButtonOnly={ true }
      />
    );
  }
}

RelevantDocumentCard.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  allegation: PropTypes.object,
  addItemInPinboardPage: PropTypes.func,
  pinned: PropTypes.bool,
};

export default RelevantDocumentCard;
