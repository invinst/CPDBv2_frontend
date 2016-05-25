import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle, extraWideWrapperStyle
} from './article-small.style';


class ArticleSmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style]
      },
      [EXTRA_WIDE]: {
        wrapper: [wrapperStyle, extraWideWrapperStyle, this.props.style]
      }
    };
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <ArticleHeader>{ this.props.header }</ArticleHeader>
      );
    }
    return null;
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='article-small' style={ style.wrapper } onClick={ this.props.onClick }>
        <div style={ contentStyle }>
          { this.renderHeader() }
          { this.props.children }
        </div>
      </div>
    );
  }
}

ArticleSmall.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  header: PropTypes.string,
  children: PropTypes.node.isRequired
};

ArticleSmall.defaultProps = {
  content: 'How to predict bad cops in Chicago.'
};

export default Radium(ArticleSmall);
