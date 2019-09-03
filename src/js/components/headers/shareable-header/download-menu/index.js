import React, { PropTypes } from 'react';

import style from './download-menu.sass';
import DownloadMenuItem from './download-menu-item';
import { OFFICER_DOWNLOAD_KINDS } from 'utils/constants';


export default class DownloadMenu extends React.Component {
  render() {
    const {
      officerId, zipFileUrl, zipFileUrlWithDocs,
      fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl,
    } = this.props;

    return (
      <div className={ style.downloadMenu }>
        <DownloadMenuItem
          kind={ OFFICER_DOWNLOAD_KINDS.WITH_DOCS }
          fetchOfficerZipFileUrl={ fetchOfficerZipWithDocsFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrlWithDocs }
        />

        <DownloadMenuItem
          kind={ OFFICER_DOWNLOAD_KINDS.WITHOUT_DOCS }
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrl }
          officerId={ officerId }
          zipFileUrl={ zipFileUrl }
        />
      </div>
    );
  }
}

DownloadMenu.propTypes = {
  officerId: PropTypes.number,
  zipFileUrl: PropTypes.string,
  zipFileUrlWithDocs: PropTypes.string,
  fetchOfficerZipFileUrl: PropTypes.func,
  fetchOfficerZipWithDocsFileUrl: PropTypes.func,
};
