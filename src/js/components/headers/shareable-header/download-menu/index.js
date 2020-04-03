import PropTypes from 'prop-types';
import React from 'react';

import style from './download-menu.sass';
import DownloadMenuItem from './download-menu-item';
import { OFFICER_DOWNLOAD_KINDS } from 'utils/constants';


export default function DownloadMenu(props) {
  const {
    officerId, zipFileUrl, zipFileUrlWithDocs,
    fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl,
  } = props;

  return (
    <div className={ style.downloadMenu }>
      <div className='title'>Download</div>
      <DownloadMenuItem
        kind={ OFFICER_DOWNLOAD_KINDS.WITHOUT_DOCS }
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrl }
        officerId={ officerId }
        zipFileUrl={ zipFileUrl }
      />

      <DownloadMenuItem
        kind={ OFFICER_DOWNLOAD_KINDS.WITH_DOCS }
        fetchOfficerZipFileUrl={ fetchOfficerZipWithDocsFileUrl }
        officerId={ officerId }
        zipFileUrl={ zipFileUrlWithDocs }
      />
    </div>
  );
}

DownloadMenu.propTypes = {
  officerId: PropTypes.number,
  zipFileUrl: PropTypes.string,
  zipFileUrlWithDocs: PropTypes.string,
  fetchOfficerZipFileUrl: PropTypes.func,
  fetchOfficerZipWithDocsFileUrl: PropTypes.func,
};
