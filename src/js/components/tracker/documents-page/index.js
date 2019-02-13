import React, { Component, PropTypes } from 'react';

import SearchBar from './search-bar';
import DocumentsTable from './documents-table';
import Header from './header';


export default class DocumentsPage extends Component {
  render() {
    const {
      documents,
      routes,
      location,
      params,
      nextParams,
      hasMore,
      fetchTrackerDocuments,
    } = this.props;

    return (
      <div>
        <Header routes={ routes } location={ location } params={ params }/>
        <SearchBar/>
        <DocumentsTable
          rows={ documents }
          nextParams={ nextParams }
          hasMore={ hasMore }
          fetchTrackerDocuments={ fetchTrackerDocuments }/>
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: PropTypes.array,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchTrackerDocuments: PropTypes.func,
};
