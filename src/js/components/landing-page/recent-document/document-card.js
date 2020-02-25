import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './document-card.sass';
import * as tracking from 'utils/tracking';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export default class DocumentCard extends React.Component {
  handleClick = () => {
    const { crid, pathname, onTrackingAttachment, id } = this.props;
    const url = `/complaint/${crid}/`;
    tracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'Landing Page', app: 'Frontend' });
  };

  render() {
    const { previewImageUrl, crid, incidentDate, category, addOrRemoveItemInPinboard, isPinned } = this.props;
    return (
      <Link
        className={ styles.documentCard }
        to={ `/complaint/${crid}/` }
        onClick={ this.handleClick }
      >
        <ItemPinButton
          className={ pinButtonStyles.cardPinnedButton }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          showHint={ false }
          item={ {
            type: PINNED_ITEM_TYPES.CR,
            id: crid,
            isPinned,
            incidentDate,
            category,
          } }
        />
        <div className='document-card-thumbnail'>
          <img className='document-card-thumbnail-img' src={ previewImageUrl } />
        </div>
        <div className='document-card-description'>
          <div className='document-card-description-incident-date'>{ incidentDate }</div>
          <div className='document-card-description-category'>{ category }</div>
        </div>
      </Link>
    );
  }
}

DocumentCard.propTypes = {
  previewImageUrl: PropTypes.string,
  url: PropTypes.string,
  crid: PropTypes.string,
  pathname: PropTypes.string,
  incidentDate: PropTypes.string,
  category: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  id: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};

DocumentCard.defaultProps = {
  onTrackingAttachment: () => {},
};
