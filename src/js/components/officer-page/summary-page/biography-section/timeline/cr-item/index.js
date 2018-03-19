import React, { Component, PropTypes } from 'react';

import {
  categoryStyle,
  coaccusedStyle,
  detailStyle,
  findingStyle,
  kindStyle,
  kindWrapperStyle,
  rankStyle,
  showingStyle,
  wrapperShowingStyle,
  style,
  unitStyle,
  rightStyle,
  attachmentWrapperStyle,
  dateStyle,
  attachmentImageStyle,
  moreAttachmentsStyle
} from './cr-item.style';


export default class CRItem extends Component {

  renderAttachments() {
    const { attachments } = this.props.item;

    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      return (
        <span style={ attachmentWrapperStyle }>
          {
            rest.length ?
              <span style={ moreAttachmentsStyle }>+{rest.length}</span>
              :
              null
          }
          <a href={ firstAttachment.url }>
            <img style={ attachmentImageStyle } src={ firstAttachment.previewImageUrl }/>
          </a>
        </span>
      );
    }
    return <span style={ attachmentWrapperStyle }/>;
  }

  render() {
    const { item } = this.props;

    return (
      <div style={ style }>
        <span style={ rankStyle }>{ item.rank }</span>
        <span style={ unitStyle }>{ item.unitDescription }</span>
        <span style={ wrapperShowingStyle }>
          <span style={ showingStyle }>
            <div style={ kindWrapperStyle }>
              <span style={ kindStyle(item.finding === 'Sustained') }>Complaint</span>
            </div>
            <span style={ detailStyle }>
              <div style={ categoryStyle }>{ item.category }</div>
              <div style={ findingStyle }>{ item.finding }, { item.outcome }</div>
            </span>
            <span style={ rightStyle }>
              <span style={ coaccusedStyle }>1 of { item.coaccused } coaccused</span>
              { this.renderAttachments() }
              <span style={ dateStyle }>{ item.date }</span>
            </span>
          </span>
        </span>
      </div>
    );
  }
}

CRItem.propTypes = {
  item: PropTypes.object,
  attachments: PropTypes.array,
};
