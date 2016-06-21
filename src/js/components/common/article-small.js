import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle, extraWideWrapperStyle
} from './article-small.style';


class ArticleSmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    const { style } = this.props;

    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, style.wrapper]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, style.wrapper]
      },
      [EXTRA_WIDE]: {
        wrapper: [wrapperStyle, extraWideWrapperStyle, style.wrapper]
      }
    };
  }

  renderHeader() {
    const { style } = this.props;

    if (this.props.header) {
      return (
        <ArticleHeader style={ style.header }>{ this.props.header }</ArticleHeader>
      );
    }
    return null;
  }

  renderParagraphs() {
    const { style } = this.props;
    return (
      <div>
        { this.props.paragraphs.map((text, ind) => (
          <ArticleContent key={ ind } style={ style.paragraph }>{ text }</ArticleContent>
        )) }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='article-small' style={ style.wrapper } onClick={ this.props.onClick }>
        <div style={ contentStyle }>
          { this.renderHeader() }
          { this.renderParagraphs() }
        </div>
      </div>
    );
  }
}

ArticleSmall.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    header: PropTypes.object,
    paragraph: PropTypes.object
  }),
  header: PropTypes.string,
  paragraphs: PropTypes.array.isRequired
};

ArticleSmall.defaultProps = {
  style: {}
};

export default Radium(ArticleSmall);
