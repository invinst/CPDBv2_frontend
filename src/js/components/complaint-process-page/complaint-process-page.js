import React, { Component } from 'react';
import ConfiguredRadium from 'utils/configured-radium';
import CopyLinkButton from 'components/common/copy-link-btn';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { MOBILE, TABLET, DESKTOP } from 'utils/constants';
import NoRerender from 'components/common/higher-order/no-rerender';
import { style } from 'd3-selection';
import {
  wrapperStyle, headerStyle, headLineStyle, leftColumnStyle, rightColumnStyle,
  sectionHeaderStyle, authorStyle, emailLinkStyle, listElementStyle, paragraphStyle,
  emailLinkWrapperStyle, smallTextStyle, copyLinkStyle, listStyle, smallSubHeaderStyle,
} from './complaint-process-page.style';


class ComplaintProcessPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>

        <div>
          <h1 style={ headerStyle }>
            The Complaint Process
          </h1>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Can you help me file a complaint?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            How do complaints get investigated?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            How do I file a complaint?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Why is this information imperfect?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

      </div>
    );
  }
}

export default ComplaintProcessPage;
