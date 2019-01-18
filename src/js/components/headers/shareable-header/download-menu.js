import React, { PropTypes } from 'react';

import { wrapperStyle, } from './share-menu.style';
import DownloadMenuItem from './download-menu-item';


export default class DownloadMenu extends React.Component {
  render() {
    const {
      open, officerId, zipFileUrl, zipFileUrlWithDocs,
      fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div style={ wrapperStyle } className='test--shareable-header--share-menu'>
        <DownloadMenuItem
          text='Request download data + docs'
          fetchOfficerZipFileUrl={ fetchOfficerZipWithDocsFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrlWithDocs }
        />

        <DownloadMenuItem
          text='Request download data only'
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrl }
        />
      </div>
    );
  }
}

DownloadMenu.propTypes = {
  hovering: PropTypes.bool,
  open: PropTypes.bool,
  closeShareMenu: PropTypes.func,
  officerId: PropTypes.number,
  zipFileUrl: PropTypes.string,
  zipFileUrlWithDocs: PropTypes.string,
  fetchOfficerZipFileUrl: PropTypes.func,
  fetchOfficerZipWithDocsFileUrl: PropTypes.func,
};

DownloadMenu.defaultProps = {
  open: true
};
