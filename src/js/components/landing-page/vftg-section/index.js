import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import SectionTemplate from 'utils/template/section';
import { SOLID_TEMPLATE } from 'utils/constants';
import MostRecentEmailLink from './most-recent-email-link';
import {
  headerBlockStyle, headerStyle, dateStyle, newsWrapperStyle,
  vftgWrapperStyle, textStyleDesktop, textStyleExtraWide
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
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ [template.content, vftgWrapperStyle] }>
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

VFTGSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

VFTGSection.defaultProps = {
  template: SectionTemplate(SOLID_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(VFTGSection);
