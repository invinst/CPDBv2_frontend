import React, { Component } from 'react';
import ConfiguredRadium from 'utils/configured-radium';
import CopyLinkButton from 'components/common/copy-link-btn';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, headLineStyle, leftColumnStyle, rightColumnStyle,
  columnHeadLineStyle, emailLinkStyle, listElementStyle, paragraphStyle,
  emailLinkWrapperStyle, smallTextStyle, copyLinkStyle, listStyle,
} from './questions-page.style';
import { MOBILE, TABLET, DESKTOP } from 'utils/constants';
import NoRerender from 'components/common/higher-order/no-rerender';
import { style } from 'd3-selection';


class QuestionsPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>
        
        <div>
          <h2 style={ columnHeadLineStyle }>
            The Complaint Process
          </h2>
        </div>
      </div>
      

      
    );
  }
}

export default QuestionsPage;
