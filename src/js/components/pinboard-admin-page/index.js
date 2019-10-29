import React, { Component, PropTypes } from 'react';

import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class PinboardAdminPage extends Component {
  render() {
    const {
      pinboards,
      hasMore,
      nextParams,
      fetchPinboards,
      isLoading,
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer/>
        <PinboardsTable
          rows={ pinboards }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchPinboards={ fetchPinboards }
          isLoading={ isLoading }
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
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
  isLoading: false,
};
