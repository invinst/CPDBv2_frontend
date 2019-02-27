import React, { Component, PropTypes } from 'react';

import * as constants from 'utils/constants';
import DocumentsTable from './documents-table';
import SearchBar from './search-bar';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { cancelledByUser } from 'utils/axios-client';


export default class DocumentsOverviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleSearchChange(text) {
    if (this.state.searchText === text)
      return;
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
        <ShareableHeaderContainer
          buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK }
          buttonText='Crawlers'
          to='/crawlers/' />
        <SearchBar
          value={ this.state.searchText }
          onChange={ this.handleSearchChange.bind(this) }/>
        <DocumentsTable
          rows={ documents }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchDocuments={ fetchDocuments }
          onCRLinkClick={ this.handleSearchChange.bind(this) }/>
      </div>
    );
  }
}

DocumentsOverviewPage.propTypes = {
  documents: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  searchDocuments: PropTypes.func,
  fetchDocuments: PropTypes.func
};
