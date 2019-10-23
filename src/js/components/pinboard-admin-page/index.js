import React, { Component, PropTypes } from 'react';
import { locationShape } from 'react-router/lib/PropTypes';
import * as _ from 'lodash';
import { browserHistory } from 'react-router';

import * as constants from 'utils/constants';
import PinboardsTable from './pinboards-table';
import SearchBar from './search-bar';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class PinboardAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: _.get(this.props.location.query, 'match', ''),
    };
  }

  handleSearchChange(text) {
    const { pathname } = this.props.location;
    if (this.state.searchText === text)
      return;
    this.setState({ searchText: text });
    if (text.trim() === '') {
      browserHistory.push(pathname);
    } else {
      browserHistory.push(`${pathname}?match=${text}`);
    }
  }

  render() {
    const {
      pinboards,
      hasMore,
      nextParams,
      fetchPinboards,
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
        <PinboardsTable
          rows={ pinboards }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchPinboards={ fetchPinboards }
          onCRLinkClick={ this.handleSearchChange.bind(this) }/>
      </div>
    );
  }
}

PinboardAdminPage.propTypes = {
  pinboards: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchPinboards: PropTypes.func,
  location: locationShape,
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  location: {},
};
