import PropTypes from 'prop-types';
import React from 'react';
import download from 'downloadjs';
import { throttle } from 'lodash';

import style from './download-menu-item.sass';
import { OFFICER_DOWNLOAD_KINDS, OFFICER_DOWNLOAD_TRACKING_ACTIONS } from 'utils/constants';
import * as tracking from 'utils/tracking';
import LoadingSpinner from 'components/common/loading-spinner';


const contentMap = {
  [OFFICER_DOWNLOAD_KINDS.WITH_DOCS]: { text: 'Data + Documents', extension: 'xlxs, pdf' },
  [OFFICER_DOWNLOAD_KINDS.WITHOUT_DOCS]: { text: 'Data', extension: 'xlxs' },
};

export default class DownloadMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      preZipFileUrl: props.zipFileUrl,
    };
    this.clickHandler = throttle(this.clickHandler, 1000, { 'trailing': false });
  }

  static getDerivedStateFromProps(props, state) {
    const { zipFileUrl } = props;
    if (zipFileUrl && !state.preZipFileUrl)
      return { requested: false, preZipFileUrl: zipFileUrl };
    return null;
  }

  componentDidUpdate(prevProps) {
    const { zipFileUrl } = this.props;
    if (zipFileUrl && !prevProps.zipFileUrl)
      this.triggerDownload(zipFileUrl);
  }

  triggerDownload(zipFileUrl) {
    const { officerId, kind } = this.props;
    tracking.trackOfficerDownload(officerId, OFFICER_DOWNLOAD_TRACKING_ACTIONS.DOWNLOAD, kind);
    download(zipFileUrl);
  }

  clickHandler = () => {
    const { fetchOfficerZipFileUrl, officerId, zipFileUrl, kind } = this.props;
    if (zipFileUrl)
      this.triggerDownload(zipFileUrl);
    else {
      tracking.trackOfficerDownload(officerId, OFFICER_DOWNLOAD_TRACKING_ACTIONS.REQUEST_DOWNLOAD_URLS, kind);
      fetchOfficerZipFileUrl(officerId);
      this.setState({ requested: true });
    }
  };

  render() {
    const { kind } = this.props;
    const { text, extension } = contentMap[kind];

    return (
      <div className={ style.downloadMenuItem } onClick={ this.clickHandler }>
        <div className='download-item-text'>
          <span className='item-title'>{ text }</span>
          <span className='item-extension'>{ extension }</span>
        </div>
        {
          this.state.requested ? (
            <LoadingSpinner className='download-requesting' />
          ) : (
            <div className='download-menu-item-img' />
          )
        }
      </div>
    );
  }
}

DownloadMenuItem.propTypes = {
  fetchOfficerZipFileUrl: PropTypes.func,
  kind: PropTypes.string,
  zipFileUrl: PropTypes.string,
  officerId: PropTypes.number,
};
