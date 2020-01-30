import React, { Component, PropTypes } from 'react';
import { locationShape } from 'react-router/lib/PropTypes';
import { browserHistory } from 'react-router';
import { get } from 'lodash';

import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import styles from './pinboard-admin-page.sass';
import SearchBar from 'components/common/search-bar';


export default class PinboardAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingPreviewPane: false,
      focusedItem: {},
      searchText: get(this.props.location.query, 'match', ''),
    };
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.focusItem = this.focusItem.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillUnmount() {
    const { clearPinboardStaticSocialGraphCache } = this.props;
    clearPinboardStaticSocialGraphCache();
  }

  focusItem(focusedItem) {
    this.setState({ focusedItem, isShowingPreviewPane: true });
  }

  handleOverlayClick() {
    this.setState({ isShowingPreviewPane: false });
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
      isLoading,
      fetchPinboardStaticSocialGraph,
      cachedDataIDs,
    } = this.props;
    const { focusedItem, isShowingPreviewPane } = this.state;

    return (
      <div className={ styles.pinboardAdminPage }>
        <ShareableHeaderContainer/>
        <SearchBar
          value={ this.state.searchText }
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
  location: locationShape,
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  isLoading: false,
  fetchPinboards: () => {},
  fetchPinboardStaticSocialGraph: () => {},
};
