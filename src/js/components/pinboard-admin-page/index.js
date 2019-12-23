import React, { Component, PropTypes } from 'react';

import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/common/preview-pane';
import styles from './pinboard-admin-page.sass';


export default class PinboardAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingPreviewPane: false,
      focusedItem: {},
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
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  isLoading: false,
  fetchPinboards: () => {},
  fetchPinboardStaticSocialGraph: () => {},
};
