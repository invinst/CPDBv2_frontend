import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { articleHeaderStyle, headerTabletStyle } from './article-header.style';
import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';


class ArticleHeader extends Component {
  renderWithResponsiveStyle = (style) => {
    return (
      <h6 style={ [style.header, this.props.style] }>
        { this.props.children }
      </h6>
    );
  };

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [DESKTOP]: { header: [articleHeaderStyle] },
          [TABLET]: { header: [articleHeaderStyle, headerTabletStyle] },
        } }>
        { this.renderWithResponsiveStyle }
      </ResponsiveStyleComponent>
    );
  }
}

ArticleHeader.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ConfiguredRadium(ArticleHeader);
