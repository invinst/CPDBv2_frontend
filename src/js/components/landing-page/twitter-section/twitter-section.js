import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { extendWrapperStyle } from './twitter-section.style';
import TwitterEmbeddedTimeline from './twitter-embedded-timeline';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';


class TwitterSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        height: 484
      },
      [DESKTOP]: {
        height: 500
      },
      [EXTRA_WIDE]: {
        height: 600
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, extendWrapperStyle, wrapperStyle] }>
        <div style={ template.content }>
          <TwitterEmbeddedTimeline height={ style.height }/>
        </div>
      </div>
    );
  }
}

TwitterSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

TwitterSection.defaultProps = {
  template: SectionTemplate(BASE_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(TwitterSection);
