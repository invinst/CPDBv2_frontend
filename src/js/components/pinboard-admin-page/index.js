import PropTypes from 'prop-types';
import React, { Component } from 'react';
import queryString from 'query-string';
import { get } from 'lodash';

import browserHistory from 'utils/history';
import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import styles from './pinboard-admin-page.sass';
import SearchBar from 'components/common/search-bar';


export default class PinboardAdminPage extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(get(this.props, 'location.search', ''));
    this.state = {
      isShowingPreviewPane: false,
      focusedItem: {},
      searchText: query['match'],
    };
  }

  componentWillUnmount() {
    const { clearPinboardStaticSocialGraphCache } = this.props;
    clearPinboardStaticSocialGraphCache();
  }

  focusItem = focusedItem => {
    this.setState({ focusedItem, isShowingPreviewPane: true });
  };

  handleOverlayClick = () => {
    this.setState({ isShowingPreviewPane: false });
  };

  handleSearchChange = text => {
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
      pinboards,
      hasMore,
      nextParams,
      fetchPinboards,
      isLoading,
      fetchPinboardStaticSocialGraph,
      cachedDataIDs,
    } = this.props;
    const { focusedItem, isShowingPreviewPane, searchText } = this.state;

    return (
      <div className={ styles.pinboardAdminPage }>
        <ShareableHeaderContainer/>
        <SearchBar
          value={ searchText }
          onChange={ this.handleSearchChange }/>
        <PinboardsTable
          rows={ pinboards }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchPinboards={ fetchPinboards }
          isLoading={ isLoading }
          focusItem={ this.focusItem }
        />
        <PreviewPaneWithOverlay
          isShown={ isShowingPreviewPane }
          handleClose={ this.handleOverlayClick }
          customClass='preview-pane'
          yScrollable={ true }
          dynamicHeight={ true }
          fetchPinboardStaticSocialGraph={ fetchPinboardStaticSocialGraph }
          cachedDataIDs={ cachedDataIDs }
          type='PINBOARD'
          data={ focusedItem }
        />
      </div>
    );
  }
}

PinboardAdminPage.propTypes = {
  pinboards: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchPinboards: PropTypes.func,
  isLoading: PropTypes.bool,
  fetchPinboardStaticSocialGraph: PropTypes.func,
  clearPinboardStaticSocialGraphCache: PropTypes.func,
  cachedDataIDs: PropTypes.array,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  isLoading: false,
  fetchPinboards: () => {},
  fetchPinboardStaticSocialGraph: () => {},
};
