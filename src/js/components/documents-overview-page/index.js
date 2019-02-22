import React, { Component, PropTypes } from 'react';

import DocumentsTable from './documents-table';
import SearchBar from './search-bar';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { cancelledByUser } from 'utils/axios-client';


export default class DocumentDeduplicatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleSearchChange(text) {
    this.setState({ searchText: text });
    this.props.searchDocuments(text).catch(cancelledByUser);
  }

  render() {
    const {
      documents,
      hasMore,
      nextParams,
      fetchDocuments
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer/>
        <SearchBar
          value={ this.state.searchText }
          onChange={ this.handleSearchChange.bind(this) }/>
        <DocumentsTable
          rows={ documents }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchDocuments={ fetchDocuments }/>
      </div>
    );
  }
}

DocumentDeduplicatorPage.propTypes = {
  documents: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  searchDocuments: PropTypes.func,
  fetchDocuments: PropTypes.func
};
