import React, { PropTypes } from 'react';

export default class DownloadMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { fetchOfficerZipFileUrl, officerId } = this.props;
    fetchOfficerZipFileUrl(officerId);
    this.setState({
      requested: true
    });
  }

  render() {
    const { zipFileUrl, isRequestingZipURL, text } = this.props;
    return (
      <div>
        <div onClick={ this.clickHandler }>{ text }</div>
        <div> { (isRequestingZipURL && this.state.requested) ? 'Downloading' : ''} </div>
        {
          (zipFileUrl && this.state.requested) ? (
            <a download={ true } href={ zipFileUrl } > Click here to download </a>
          ) : null
        }
      </div>
    );
  }
}

DownloadMenuItem.propTypes = {
  fetchOfficerZipFileUrl: PropTypes.func,
  zipFileUrl: PropTypes.string,
  officerId: PropTypes.number,
  isRequestingZipURL: PropTypes.bool,
};

DownloadMenuItem.defaultProps = {
};
