import React, { Component } from 'react';
import CopyLinkButton from 'components/common/copy-link-btn';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, headLineStyle, leftColumnStyle, rightColumnStyle,
  columnHeadLineStyle, emailLinkStyle, listElementStyle, paragraphStyle,
  emailLinkWrapperStyle, smallTextStyle, copyLinkStyle, listStyle,
} from './questions-page.style';
import { MOBILE, TABLET, DESKTOP } from 'utils/constants';
import NoRerender from 'components/common/higher-order/no-rerender';


class QuestionsPage extends Component {
  render() {
    return <h1>Hello!</h1>;
  }
}

export default NoRerender(ConfiguredRadium(QuestionsPage));
