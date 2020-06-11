import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import { RelevantDocumentCardWithUndo as RelevantDocumentCard } from './relevant-document-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantDocuments extends Component {
  loadMore = () => {
    const { pinboardId, nextParams, fetchPinboardRelevantDocuments } = this.props;
    fetchPinboardRelevantDocuments(pinboardId, nextParams);
  };

  render() {
    const { documents, hasMore, addItemInPinboardPage, requesting, focusItem } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='DOCUMENTS'
        childWidth={ 306 }
        hasMore={ hasMore }
        loadMore={ this.loadMore }
        className='relevant-documents'
        requesting={ requesting }
      >
        {
          documents.map((document, index) =>
            <div key={ index } style={ { width: '306px' } }>
              <RelevantDocumentCard
                { ...document }
                addItemInPinboardPage={ addItemInPinboardPage }
                focusItem={ focusItem }
              />
            </div>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  nextParams: PropTypes.object,
  fetchPinboardRelevantDocuments: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
  addItemInPinboardPage: PropTypes.func,
  requesting: PropTypes.bool,
  focusItem: PropTypes.func,
};

RelevantDocuments.defaultProps = {
  documents: [],
  focusItem: noop,
};
