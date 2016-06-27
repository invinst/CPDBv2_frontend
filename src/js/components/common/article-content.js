import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, { TABLET, DESKTOP } from 'components/responsive/responsive-style-component';
import { contentStyle, contentTabletStyle } from './article-content.style';


class ArticleContent extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        content: [contentStyle, contentTabletStyle, this.props.style]
      },
      [DESKTOP]: {
        content: [contentStyle, this.props.style]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <p style={ style.content }>
        { this.props.children }
      </p>
    );
  }
}

ArticleContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default ConfiguredRadium(ArticleContent);
