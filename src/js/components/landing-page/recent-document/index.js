import React, { Component, PropTypes } from 'react';

import DocumentCard from './document-card';
import Carousel from 'components/common/carousel';
import InlineEditHeader from 'components/common/carousel/inline-header-section';


export default class RecentDocument extends Component {

  componentDidMount() {
    this.props.getRecentDocument();
  }

  render() {

    const { cards, editWrapperStateProps } = this.props;
    const slideWidth = 232;

    const documents = cards.map((cr) => {
      return (
        <div key={ cr.crid } style={ { width: `${slideWidth}px` } }>
          <DocumentCard
            crid={ cr.crid }
            numDocuments={ cr.numDocuments }
            previewImageUrl={ cr.latestDocument.previewImageUrl }
            url={ cr.latestDocument.url }
          />
        </div>
      );
    });
    return (
      <div className='test--recent-document'>
        <Carousel
          headerSection={
            <InlineEditHeader editWrapperStateProps={ editWrapperStateProps } type='document'/>
          }
        >
          { documents }
        </Carousel>
      </div>
    );
  }
}

RecentDocument.propTypes = {
  cards: PropTypes.array,
  getRecentDocument: PropTypes.func,
  editWrapperStateProps: PropTypes.object
};
