import React, { Component, PropTypes } from 'react';

import DocumentsTable from './documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class DocumentDeduplicatorPage extends Component {
  render() {
    const {
      documents,
      setDocumentShow
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer hasHeaderButton={ false }/>
        <DocumentsTable
          rows={ documents }
          setDocumentShow={ setDocumentShow }/>
      </div>
    );
  }
}

DocumentDeduplicatorPage.propTypes = {
  documents: PropTypes.array,
  setDocumentShow: PropTypes.func
};
