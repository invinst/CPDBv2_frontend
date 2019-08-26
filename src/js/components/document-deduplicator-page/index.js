import React, { Component, PropTypes } from 'react';

import * as constants from 'utils/constants';
import DocumentsTable from './documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class DocumentDeduplicatorPage extends Component {
  render() {
    const {
      documents,
      setDocumentShow,
      hasMore,
      nextParams,
      fetchDocumentsByCRID,
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE }/>
        <DocumentsTable
          rows={ documents }
          setDocumentShow={ setDocumentShow }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchDocumentsByCRID={ fetchDocumentsByCRID }/>
      </div>
    );
  }
}

DocumentDeduplicatorPage.propTypes = {
  documents: PropTypes.array,
  setDocumentShow: PropTypes.func,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocumentsByCRID: PropTypes.func,
};
