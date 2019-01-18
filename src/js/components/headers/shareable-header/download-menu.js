import React, { PropTypes } from 'react';

import { wrapperStyle, } from './share-menu.style';
import DownloadMenuItem from './download-menu-item';


export default class DownloadMenu extends React.Component {
  render() {
    const { open, fetchOfficerZipFileUrl, officerId, zipFileUrl, isRequestingZipURL } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div style={ wrapperStyle } className='test--shareable-header--share-menu'>
        <DownloadMenuItem
          text='Request download data + docs'
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrl }
          isRequestingZipURL={ isRequestingZipURL }
        />

        <DownloadMenuItem
          text='Request download data only'
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrl }
          isRequestingZipURL={ isRequestingZipURL }
        />
      </div>
    );
  }
}

DownloadMenu.propTypes = {
  hovering: PropTypes.bool,
  open: PropTypes.bool,
  closeShareMenu: PropTypes.func,
};

DownloadMenu.defaultProps = {
  open: true
};
