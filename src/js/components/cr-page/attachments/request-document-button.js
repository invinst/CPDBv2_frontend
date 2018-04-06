import React, { PropTypes, Component } from 'react';

import { buttonStyle } from './request-document-button.style';


export default class RequestDocumentButton extends Component {
  hanldeClick() {
    if (this.props.alreadyRequested) {
      return;
    }

    this.props.openRequestDocumentModal();
  }

  render() {
    const { alreadyRequested } = this.props;
    return (
      <div className='test--attachment-request' onClick={ this.hanldeClick.bind(this) } style={ buttonStyle }>
        {
          !alreadyRequested
            ? 'Request Documents'
            : <span>Documents Requested &nbsp; <span>✔</span></span>
        }
      </div>
    );
  }
}

RequestDocumentButton.propTypes = {
  alreadyRequested: PropTypes.bool,
  openRequestDocumentModal: PropTypes.func
};
