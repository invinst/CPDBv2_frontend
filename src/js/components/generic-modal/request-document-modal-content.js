import React, { Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { paddingWrapperStyle, inputStyle, instructionStyle } from './generic-modal.style';

class RequestDocumentModalContent extends Component {
  render() {
    return (
      <div>
        <div style={ paddingWrapperStyle }>
          <p style={ instructionStyle }>We’ll notify you when the document is made available.</p>
          <input style={ inputStyle } placeholder='Your email' />
        </div>
      </div>
    );
  }
}

export default ConfiguredRadium(RequestDocumentModalContent);
