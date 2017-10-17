import React, { PropTypes, Component } from 'react';
import { map, capitalize } from 'lodash';

import {
  itemTitleStyle,
  iconStyle,
  itemTitleWithBorderStyle,
  emptyMessageStyle,
  requestLinkStyle,
  okMarkStyle
} from './attachments.style';
import BlockTitle from 'components/common/block-title';

const emptyMessageMappings = {
  DOCUMENTS: 'documents',
  VIDEO: 'video clips',
  AUDIO: 'audio files'
};

export default class Attachments extends Component {
  render() {
    const {
      title,
      items,
      iconName,
      openRequestDocumentModal,
      showRequestMessage,
      alreadyRequested
    } = this.props;

    const message = emptyMessageMappings[title] || 'documents';
    let body;

    let requestMessage = null;
    if (showRequestMessage) {
      requestMessage = !alreadyRequested ? (
        <p>
          <a className='test--attachment-request' style={ requestLinkStyle } onClick={ openRequestDocumentModal }>
            Request { capitalize(message) }
          </a>
        </p>
      ) : (
        <p className='test--attachment-requested' style={ { textTransform: 'capitalize' } }>
          { message } Requested &nbsp; <span style={ okMarkStyle }>✔</span>
        </p>
      );
    }

    if (!items || items.length === 0) {
      body = (
        <div style={ emptyMessageStyle }>
          <p>There are no { message } publicly available for this incident at this time.</p>
          { requestMessage }
        </div>
      );

    } else {
      const lastItemIndex = items.length - 1;
      body = (
        map(items, (item, index) => (
          <div key={ index }>
            <i style={ iconStyle(iconName) }/>
            <a style={ index === lastItemIndex ? itemTitleStyle : itemTitleWithBorderStyle } href={ item.url }>
              { item.title }
            </a>
          </div>
        ))
      );
    }

    return (
      <div>
        <BlockTitle className='test--attachment-section-title'>{ title }</BlockTitle>
        { body }
      </div>
    );
  }
}

Attachments.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  items: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  showRequestMessage: PropTypes.bool,
  alreadyRequested: PropTypes.bool
};

Attachments.defaultProps = {
  showRequestMessage: false
};
