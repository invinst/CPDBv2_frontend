import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import {
  documentCardWrapperStyle,
  thumbnailDocumentStyle,
  imageDocumentStyle,
  descriptionDocumentStyle
} from './document-card.style';

import Hoverable from 'components/common/higher-order/hoverable';

class DocumentCard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handlerClick = this.handlerClick.bind(this);
  // }

  handlerClick(e) {
    e.preventDefault();
    const { url, crid } = this.props;
    const allegationUrl = `/complaint/${crid}/`;

    window.open(allegationUrl, '_blank');
    window.location.href = url;
  }

  render() {
    const { numDocuments, previewImageUrl, crid, hovering } = this.props;
    return (
      <div style={ documentCardWrapperStyle(hovering) }>
        <Link
          style={ { textDecoration: 'none' } }
          // to={ `/complaint/${crid}/` }
          className='test--document-card'
          onClick={ this.handlerClick = this.handlerClick.bind(this) }
        >
          <div style={ thumbnailDocumentStyle }>
            <img style={ imageDocumentStyle } src={ previewImageUrl }/>
          </div>
          <div>
            <div style={ descriptionDocumentStyle(hovering) }>
              { pluralize('new document', numDocuments, true) } added to CR { crid }
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

DocumentCard.propTypes = {
  numDocuments: PropTypes.number,
  previewImageUrl: PropTypes.string,
  url: PropTypes.string,
  crid: PropTypes.string,
  hovering: PropTypes.bool
};

export default Hoverable(DocumentCard);
