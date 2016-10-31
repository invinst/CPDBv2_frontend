import React, { Component } from 'react';

import MoreLink from 'components/common/more-link';
import {
  wrapperStyle, titleStyle, rightColumnStyle, firstRowStyle, linkStyle, secondRowStyle
} from './code-of-silence-section.style';


export default class CodeOfSilenceSection extends Component {
  render() {
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>Code of Silence</div>
        <div style={ rightColumnStyle }>
          <div style={ firstRowStyle }>
            Read the full story on <MoreLink style={ linkStyle } href=''>The Intercept</MoreLink>
          </div>
          <div style={ secondRowStyle }>Purchase the print edition to read offline</div>
        </div>
      </div>
    );
  }
}
