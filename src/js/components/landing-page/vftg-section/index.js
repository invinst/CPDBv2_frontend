import React, { PropTypes } from 'react';
import moment from 'moment';

import ConfiguredRadium from 'utils/configured-radium';
import MostRecentEmailLink from './most-recent-email-link';
import {
  headerBlockStyle, headerStyle, dateStyle, newsWrapperStyle,
  vftgWrapperStyle, textStyleDesktop, textStyleExtraWide, wrapperStyle
} from './vftg-section.style';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import SubscribeForm from 'containers/landing-page/vftg-section/subscribe-form-container';


class VFTGSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        textStyle: textStyleExtraWide
      },
      [DESKTOP]: {
        textStyle: textStyleDesktop
      },
      [TABLET]: {
        textStyle: textStyleDesktop
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { headerText, date, contentText, contentLink } = this.props;
    const formattedDate = moment(date, 'YYYY-MM-DD').format('ll');
    return (
      <div style={ wrapperStyle }>
        <div style={ vftgWrapperStyle }>
          <div style={ newsWrapperStyle }>
            <div style={ headerBlockStyle }>
              <span style={ headerStyle }>{ headerText }</span>
              <span style={ dateStyle }>{ formattedDate }</span>
            </div>
            <a className='link--transition' style={ style.textStyle } key={ style.screen } href={ contentLink }>
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
