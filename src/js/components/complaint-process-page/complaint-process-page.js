import React, { Component } from 'react';
import ConfiguredRadium from 'utils/configured-radium';
import CopyLinkButton from 'components/common/copy-link-btn';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { MOBILE, TABLET, DESKTOP } from 'utils/constants';
import NoRerender from 'components/common/higher-order/no-rerender';
import { style } from 'd3-selection';
import {
  wrapperStyle, headLineStyle, leftColumnStyle, rightColumnStyle,
  sectionHeaderStyle, emailLinkStyle, listElementStyle, paragraphStyle,
  emailLinkWrapperStyle, smallTextStyle, copyLinkStyle, listStyle, smallSubHeaderStyle,
} from './complaint-process-page.style';


class ComplaintProcessPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            The Complaint Process
          </h1>
        </div>
      </div>
    );
  }
}

export default ComplaintProcessPage;
