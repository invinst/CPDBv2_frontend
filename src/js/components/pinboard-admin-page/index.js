import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { PreviewPaneWithOverlay } from 'components/search-page/search-results/preview-pane';
import styles from './pinboard-admin-page.sass';


export default class PinboardAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedItem: {},
    };
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.focusItem = this.focusItem.bind(this);
  }

  focusItem(focusedItem) {
    this.setState({ focusedItem });
  }

  handleOverlayClick() {
    this.focusItem({});
  }

  render() {
    const {
      pinboards,
      hasMore,
      nextParams,
      fetchPinboards,
      isLoading,
      fetchPinboardSocialGraph,
      cachedDataIDs,
    } = this.props;
    const { focusedItem } = this.state;

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
          isShown={ !isEmpty(focusedItem) }
          handleClose={ this.handleOverlayClick }
          customClass='preview-pane'
          yScrollable={ true }
          dynamicHeight={ true }
          fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
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
  fetchPinboardSocialGraph: PropTypes.func,
  cachedDataIDs: PropTypes.array,
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  isLoading: false,
};
