import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ArticleSmall from 'components/common/article-small';
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

  renderWithResponsiveStyle(style) {
    const { header, wrapper } = style.article;

    return (
      <ArticleSmall
        style={ { header, wrapper } }
        header='About CPDP' paragraphs={ [
          [
            'The Citizens Police Data Project houses police disciplinary ',
            'information obtained from the City of Chicago.'
          ].join(''),
          [
            'The information and stories we have collected here are intended ',
            'as a resource for public oversight. Our aim is to create a new ',
            'model of accountability between officers and citizens.'
          ].join('')
        ] }/>
    );
  }
}

AboutSection.propTypes = {
  style: PropTypes.object
};

export default ConfiguredRadium(AboutSection);
