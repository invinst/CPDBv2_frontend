import React, { PropTypes, Component } from 'react';
import { map, capitalize } from 'lodash';

import {
  itemTitleStyle,
  iconStyle,
  itemTitleWithBorderStyle,
  emptyMessageStyle,
  requestLinkStyle
} from './attachments.style';
import BlockTitle from 'components/common/block-title';

const emptyMessageMappings = {
  DOCUMENTS: 'documents',
  VIDEO: 'video clips',
  AUDIO: 'audio files'
};

export default class Attachments extends Component {
  render() {
    const { title, items, iconName, openRequestDocumentModal } = this.props;
    let body;

    if (!items || items.length == 0) {
      const message = emptyMessageMappings[title] || 'documents';
      body = (
        <div style={ emptyMessageStyle }>
          <p>There are no { message } publicly available for this incident at this time.</p>
          <p style={ { display: 'none' } /* TODO in story #151246125 */ }>
            <a style={ requestLinkStyle } onClick={ openRequestDocumentModal }>Request { capitalize(message) }</a>
          </p>
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
  openRequestDocumentModal: PropTypes.func
};
