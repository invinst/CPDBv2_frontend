import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, { TABLET, DESKTOP } from 'components/responsive/responsive-style-component';
import { contentStyle, contentTabletStyle } from './article-content.style';


class ArticleContent extends Component {
  renderWithResponsiveStyle(style) {
    return (
      <p style={ style.content }>
        { this.props.children }
      </p>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [TABLET]: {
            content: [contentStyle, contentTabletStyle, this.props.style],
          },
          [DESKTOP]: {
            content: [contentStyle, this.props.style],
          },
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

ArticleContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ConfiguredRadium(ArticleContent);
