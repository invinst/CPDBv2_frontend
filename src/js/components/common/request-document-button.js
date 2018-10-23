import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle } from './request-document-button.style';


export class RequestDocumentButton extends Component {
  handleClick() {
    if (this.props.alreadyRequested) {
      return;
    }

    this.props.openRequestDocumentModal();
  }

  render() {
    const { alreadyRequested, hovering, hasData } = this.props;
    return (
      <div
        className='test--attachment-request'
        onClick={ this.handleClick.bind(this) }
        style={ buttonStyle(alreadyRequested, hovering, hasData) }>
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
  hovering: PropTypes.bool,
  hasData: PropTypes.bool,
};

export default Hoverable(RequestDocumentButton);
