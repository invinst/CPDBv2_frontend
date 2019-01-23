import React, { PropTypes } from 'react';
import download from 'downloadjs';
import { throttle } from 'lodash';

import style from './download-menu-item.sass';
import { imgUrl } from 'utils/static-assets';


export default class DownloadMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
    };
    this.clickHandler = throttle(this.clickHandler.bind(this), 1000, { 'trailing': false });
  }

  componentWillReceiveProps(nextProps) {
    const { zipFileUrl } = this.props;
    if (nextProps.zipFileUrl && !zipFileUrl && this.state.requested)
      this.triggerDownload(nextProps.zipFileUrl);
  }

  triggerDownload(zipFileUrl) {
    download(zipFileUrl);
    this.setState({ requested: false });
  }

  clickHandler() {
    const { fetchOfficerZipFileUrl, officerId, zipFileUrl } = this.props;
    this.setState({ requested: true });
    if (zipFileUrl)
      this.triggerDownload(zipFileUrl);
    else
      fetchOfficerZipFileUrl(officerId);
  }

  render() {
    return (
      <div className={ style.downloadMenuItem } onClick={ this.clickHandler }>
        <div className='request-download'>{ this.props.text }</div>
        {
          this.state.requested ? (
            <img className='download-menu-item-img' src={ imgUrl('loading.svg') } alt='downloading' />
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
  text: PropTypes.string,
  zipFileUrl: PropTypes.string,
  officerId: PropTypes.number,
};

DownloadMenuItem.defaultProps = {
};
