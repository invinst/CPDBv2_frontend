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
    const { style } = this.props;
    const propWrapperStyle = style ? style.wrapper : null;

    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, propWrapperStyle]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, propWrapperStyle]
      },
      [EXTRA_WIDE]: {
        wrapper: [wrapperStyle, extraWideWrapperStyle, propWrapperStyle]
      }
    };
  }

  renderHeader() {
    const { style } = this.props;
    const headerStyle = style ? style.header : null;

    if (this.props.header) {
      return (
        <ArticleHeader style={ headerStyle }>{ this.props.header }</ArticleHeader>
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
