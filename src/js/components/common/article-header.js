import React, { PropTypes } from 'react';
import Radium from 'radium';

import { articleHeaderStyle, headerTabletStyle } from './article-header.style';
import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';


class ArticleHeader extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: { header: [articleHeaderStyle] },
      [TABLET]: { header: [articleHeaderStyle, headerTabletStyle] }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <h6 style={ style.header }>
        { this.props.children }
      </h6>
    );
  }
}

ArticleHeader.propTypes = {
  children: PropTypes.node
};

export default Radium(ArticleHeader);
