import React, { PropTypes } from 'react';
import moment from 'moment';
import { isEqual } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import MostRecentEmailLink from './most-recent-email-link';
import {
  headerBlockStyle, headerStyle, dateStyle, newsWrapperStyle,
  vftgWrapperStyle, textStyleDesktop, textStyleExtraWide, wrapperStyle
} from './vftg-section.style';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import SubscribeForm from 'containers/landing-page/vftg-section/subscribe-form-container';
import createFunctionWithTimeout from 'utils/create-function-with-timeout';


class VFTGSection extends ResponsiveStyleComponent {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  constructor(props) {
    super(props);
    this.handleClickVftgLink = this.handleClickVftgLink.bind(this);
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        textStyle: textStyleExtraWide,
        header: [headerStyle.base, headerStyle.extraWide]
      },
      [DESKTOP]: {
        textStyle: textStyleDesktop,
        header: [headerStyle.base, headerStyle.desktop]
      },
      [TABLET]: {
        textStyle: textStyleDesktop,
        header: [headerStyle.base, headerStyle.tablet]
      }
    };
  }

  handleClickVftgLink(event) {
    event.preventDefault();

    global.ga('send', 'event', 'VFTG section: news link', 'click', {
      hitCallback: createFunctionWithTimeout(() => window.location = this.props.contentLink )
    });
  }

  renderWithResponsiveStyle(style) {
    const { headerText, date, contentText, contentLink } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('ll');
    return (
      <div style={ wrapperStyle }>
        <div style={ vftgWrapperStyle }>
          <div style={ newsWrapperStyle }>
            <div style={ headerBlockStyle }>
              <span style={ style.header }>{ headerText }</span>
              <span style={ dateStyle }>{ formattedDate }</span>
            </div>
            <a
              className='link--transition' style={ style.textStyle }
              key={ style.screen } onClick={ this.handleClickVftgLink }>
              { contentText }
            </a>
          </div>
          <div>
            <MostRecentEmailLink href={ contentLink }/>
            <SubscribeForm />
          </div>
        </div>
      </div>
    );
  }
}

VFTGSection.propTypes = {
  headerText: PropTypes.string,
  date: PropTypes.string,
  contentText: PropTypes.string,
  contentLink: PropTypes.string
};

export default ConfiguredRadium(VFTGSection);
