import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { STORIES_PATH } from 'utils/constants';
import {
  alignLeftStyle, alignRightStyle, coverageWrapperStyle, headerStyle, wrapperStyle, contentStyle
} from './reporting-section.style';
import ReportingPlaceHolder from 'components/landing-page/reporting-section/place-holder';
import ReportingSectionContent from 'components/landing-page/reporting-section/reporting-section-content';
import MoreLink from 'components/common/more-link';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import PropsRerender from 'components/common/higher-order/props-rerender';


class ReportingSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        header: [headerStyle.base, headerStyle.extraWide]
      },
      [DESKTOP]: {
        header: [headerStyle.base, headerStyle.desktop]
      },
      [TABLET]: {
        header: [headerStyle.base, headerStyle.tablet]
      }
    };
  }

  renderContent() {
    const { dataAvailable, stories } = this.props;

    return (
      !dataAvailable ?
        <ReportingPlaceHolder/> :
        <ReportingSectionContent
          stories={ stories }
          onStoryClick={ this.props.openBottomSheetWithStory }/>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ [wrapperStyle, coverageWrapperStyle] }>
        <div style={ style.header }>
          <div>
            <span style={ alignLeftStyle }>Recent Reports</span>
            <span style={ alignRightStyle }>
              <MoreLink to={ STORIES_PATH }>See more reporting</MoreLink>
            </span>
          </div>
        </div>
        <div style={ contentStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

ReportingSection.propTypes = {
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  stories: PropTypes.array
};

export default PropsRerender(ConfiguredRadium(ReportingSection));
