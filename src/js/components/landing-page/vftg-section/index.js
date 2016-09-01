import React from 'react';

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
    return (
      <div style={ wrapperStyle }>
        <div style={ vftgWrapperStyle }>
          <div style={ newsWrapperStyle }>
            <div style={ headerBlockStyle }>
              <span style={ headerStyle }>CPDP WEEKLY</span>
              <span style={ dateStyle }>Sep 23, 2016</span>
            </div>
            <div style={ style.textStyle } key={ style.screen }>
              Complaints against Chicago Police rarely result in discipline data shows.
            </div>
          </div>
          <div>
            <MostRecentEmailLink/>
            <SubscribeForm />
          </div>
        </div>
      </div>
    );
  }
}

export default ConfiguredRadium(VFTGSection);
