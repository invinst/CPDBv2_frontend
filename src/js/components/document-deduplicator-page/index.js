import PropTypes from 'prop-types';
import React from 'react';

import DocumentsTable from './documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default function DocumentDeduplicatorPage(props) {
  const {
    documents,
    setDocumentShow,
    hasMore,
    nextParams,
    fetchDocumentsByCRID,
  } = props;

  return (
    <div>
      <ShareableHeaderContainer />
      <DocumentsTable
        rows={ documents }
        setDocumentShow={ setDocumentShow }
        hasMore={ hasMore }
        nextParams={ nextParams }
        fetchDocumentsByCRID={ fetchDocumentsByCRID }/>
    </div>
  );
}

DocumentDeduplicatorPage.propTypes = {
  documents: PropTypes.array,
  setDocumentShow: PropTypes.func,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocumentsByCRID: PropTypes.func,
};
