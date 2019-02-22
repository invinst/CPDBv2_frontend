import React, { Component, PropTypes } from 'react';

import * as constants from 'utils/constants';
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
        <ShareableHeaderContainer buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE }/>
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
