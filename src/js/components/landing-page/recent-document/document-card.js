import React from 'react';

import {
  documentCardWrapperStyle,
  thumbnailDocumentStyle,
  imageDocumentStyle,
  descriptionDocumentStyle
} from './document-card.style';

export default class SummaryCard extends React.Component {
  render() {
    return (
      <div style={ documentCardWrapperStyle }>
        <div style={ thumbnailDocumentStyle }>
          <img style={ imageDocumentStyle } src='http://via.placeholder.com/133x176'/>
        </div>
        <div>
          <div style={ descriptionDocumentStyle }>
            5 new attachments added to CR 12345
          </div>
        </div>
      </div>
    );
  }
}
