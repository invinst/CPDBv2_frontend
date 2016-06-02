import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleSmall from 'components/common/article-small';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import {
  articleTabletStyle, articleDesktopStyle, articleExtraWideStyle
} from './about-section.style';


class AboutSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        article: articleExtraWideStyle
      },
      [DESKTOP]: {
        article: articleDesktopStyle
      },
      [TABLET]: {
        article: articleTabletStyle
      }
    };
  }

  renderAboutArticle() {
    return (
      <div>
        <ArticleContent>
          The Citizens Police Data Project houses police disciplinary
          information obtained from the City of Chicago.
        </ArticleContent>
        <ArticleContent>
          The information and stories we have collected here are intended
          as a resource for public oversight. Our aim is to create a new
          model of accountability between officers and citizens.
        </ArticleContent>
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    const { header, wrapper } = style.article;

    return (
      <div>
        <ArticleSmall
          style={ { header, wrapper } }
          header='About CPDP'>
          { this.renderAboutArticle() }
        </ArticleSmall>
      </div>
    );
  }
}

AboutSection.propTypes = {
  style: PropTypes.object
};

export default Radium(AboutSection);
