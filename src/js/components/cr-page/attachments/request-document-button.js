import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle } from './request-document-button.style';


export class RequestDocumentButton extends Component {
  hanldeClick() {
    if (this.props.alreadyRequested) {
      return;
    }

    this.props.openRequestDocumentModal();
  }

  render() {
    const { alreadyRequested, hovering } = this.props;
    return (
      <div
        className='test--attachment-request'
        onClick={ this.hanldeClick.bind(this) }
        style={ buttonStyle(alreadyRequested, hovering) }>
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
  openRequestDocumentModal: PropTypes.func,
  hovering: PropTypes.bool
};

export default Hoverable(RequestDocumentButton);
