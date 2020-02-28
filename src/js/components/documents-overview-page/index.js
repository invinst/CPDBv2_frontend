import PropTypes from 'prop-types';
import React, { Component } from 'react';
import queryString from 'query-string';
import { get } from 'lodash';

import browserHistory from 'utils/history';
import * as constants from 'utils/constants';
import DocumentsTable from './documents-table';
import SearchBar from 'components/common/search-bar';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';


export default class DocumentsOverviewPage extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(get(this.props, 'location.search', ''));
    this.state = {
      searchText: query['match'],
    };
  }

  handleSearchChange = (text) => {
    const { pathname } = this.props.location;
    if (this.state.searchText === text)
      return;
    this.setState({ searchText: text });
    if (text.trim() === '') {
      browserHistory.push(pathname);
    } else {
      browserHistory.push(`${pathname}?match=${text}`);
    }
  };

  render() {
    const {
      documents,
      hasMore,
      nextParams,
      fetchDocuments,
      fetchDocumentsAuthenticated,
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer
          headerButtons={
            <LinkHeaderButton buttonText='Crawlers' to='/crawlers/' />
          }
        />
        <SearchBar
          value={ this.state.searchText }
          onChange={ this.handleSearchChange }/>
        <DocumentsTable
          rows={ documents }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchDocuments={ fetchDocuments }
          fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }
          onCRLinkClick={ this.handleSearchChange }/>
      </div>
    );
  }
}

DocumentsOverviewPage.propTypes = {
  documents: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocuments: PropTypes.func,
  fetchDocumentsAuthenticated: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    query: PropTypes.object,
  }).isRequired,
};

DocumentsOverviewPage.defaultProps = {
  documents: [],
  location: {},
};
