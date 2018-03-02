import React, { Component, PropTypes } from 'react';
import DocumentCard from './document-card';
import Carousel from 'components/common/carousel';


export default class RecentDocument extends Component {

  componentDidMount() {
    this.props.getRecentDocument();
  }

  render() {

    const { cards } = this.props;

    const documents = cards.map((cr) => {
      return (
        <DocumentCard
          key={ cr.crid }
          crid={ cr.crid }
          numDocuments={ cr.numDocuments }
          previewImageUrl={ cr.latestDocument.previewImageUrl }
          url={ cr.latestDocument.url }
        />
      );
    });

    const descriptionText = (
      <div>
        <p>We often update our complaint records as we recieve more information from the City.</p>
        <p>Here are some of the recent updates.</p>
      </div>
    );

    return (
      <div className='test--recent-document'>
        <Carousel
          slides={ documents }
          header='New Documents'
          description={ descriptionText }
        />
      </div>
    );
  }
}

RecentDocument.propTypes = {
  cards: PropTypes.array,
  getRecentDocument: PropTypes.func
};
