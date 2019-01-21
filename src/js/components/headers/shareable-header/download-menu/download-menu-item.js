import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './download-menu-item.sass';
import { imgUrl } from 'utils/static-assets';


export default class DownloadMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { fetchOfficerZipFileUrl, officerId, zipFileUrl } = this.props;
    if (zipFileUrl)
      return;

    fetchOfficerZipFileUrl(officerId);
    this.setState({ requested: true });
  }

  render() {
    const { zipFileUrl, text } = this.props;
    return (
      <div className={ style.downloadMenuItem }>
        <div
          className={ cx('request-download', { 'disable-pointer': zipFileUrl }) }
          onClick={ this.clickHandler }>{ text }
        </div>
        {
          zipFileUrl ? (
            <a download={ true } href={ zipFileUrl }>
              <img className='download-menu-item-img' src={ imgUrl('download.svg') } alt='download' />
            </a>
          ) : (
            this.state.requested ? (
              <img className='download-menu-item-img' src={ imgUrl('loading.svg') } alt='downloading' />
            ): null
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
