import React, { Component, PropTypes } from 'react';

import * as constants from 'utils/constants';
import PinboardsTable from './pinboards-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class PinboardAdminPage extends Component {
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
          to='/crawlers/'
        />
        <PinboardsTable
          rows={ pinboards }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchPinboards={ fetchPinboards }
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
};

PinboardAdminPage.defaultProps = {
  pinboards: [],
};
