import React, { PropTypes } from 'react';
import { map, isEqual } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  paragraphStyle, contentWrapperStyle, wrapperStyle, headerStyle, contentStyle
} from './about-section.style';


class AboutSection extends ResponsiveStyleComponent {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraph: [paragraphStyle.base, paragraphStyle.extraWide]
      },
      [DESKTOP]: {
        paragraph: [paragraphStyle.base]
      },
      [TABLET]: {
        paragraph: [paragraphStyle.base, paragraphStyle.tablet]
      }
    };
  }

  renderBody(paragraphStyle) {
    return map(this.props.body, (paragraph, key) => (
      <p style={ paragraphStyle } key={ key }>
        { paragraph.value }
      </p>
      ));
  }

  renderWithResponsiveStyle(style) {
    const { headerText } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <div>{ headerText }</div>
        </div>
        <div style={ contentStyle }>
          <div style={ contentWrapperStyle }>
            { this.renderBody(style.paragraph) }
          </div>
        </div>
      </div>
    );
  }
}

AboutSection.propTypes = {
  headerText: PropTypes.string,
  body: PropTypes.array
};

export default ConfiguredRadium(AboutSection);
