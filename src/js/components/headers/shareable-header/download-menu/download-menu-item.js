import PropTypes from 'prop-types';
import React from 'react';
import download from 'downloadjs';
import { throttle } from 'lodash';

import style from './download-menu-item.sass';
import { imgUrl } from 'utils/static-assets';
import { OFFICER_DOWNLOAD_KINDS, OFFICER_DOWNLOAD_TRACKING_ACTIONS } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';
import LoadingSpinner from 'components/common/loading-spinner';


const textMap = {
  [OFFICER_DOWNLOAD_KINDS.WITH_DOCS]: 'Data + docs',
  [OFFICER_DOWNLOAD_KINDS.WITHOUT_DOCS]: 'Data only',
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
    GATracking.trackOfficerDownload(officerId, OFFICER_DOWNLOAD_TRACKING_ACTIONS.DOWNLOAD, kind);
    download(zipFileUrl);
  }

  clickHandler = () => {
    const { fetchOfficerZipFileUrl, officerId, zipFileUrl, kind } = this.props;
    if (zipFileUrl)
      this.triggerDownload(zipFileUrl);
    else {
      GATracking.trackOfficerDownload(officerId, OFFICER_DOWNLOAD_TRACKING_ACTIONS.REQUEST_DOWNLOAD_URLS, kind);
      fetchOfficerZipFileUrl(officerId);
      this.setState({ requested: true });
    }
  };

  render() {
    const { kind } = this.props;

    return (
      <div className={ style.downloadMenuItem } onClick={ this.clickHandler }>
        <div className='request-download'>{ textMap[kind] }</div>
        {
          this.state.requested ? (
            <LoadingSpinner className='download-menu-item-img'/>
          ) : (
            <img className='download-menu-item-img' src={ imgUrl('download.svg') } alt='download' />
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
