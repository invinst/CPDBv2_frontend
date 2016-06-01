import React from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import {
  articleHeaderStyle, sectionStyle, articleContentStyle, underlinedLinkStyle, contentFontSizeTablet
} from './collaborate-section.style';


class CollaborateSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: {
        paragraph: [articleContentStyle],
        underlineLink: [underlinedLinkStyle]
      },
      [TABLET]: {
        paragraph: [articleContentStyle, contentFontSizeTablet],
        underlineLink: [underlinedLinkStyle, contentFontSizeTablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ sectionStyle }>
        <ArticleHeader style={ articleHeaderStyle }>
          Collaborate with Us
        </ArticleHeader>
        <p style={ style.paragraph }>
          We are collecting and publishing information that sheds light on police misconduct.
        </p>
        <p style={ style.paragraph }>
          If you have documents or datasets you would like to publish,
          please <a style={ style.underlineLink } href='mailto:records@invisibleinstitute.com'>
          email us,</a> or <a href='#' style={ style.underlineLink }>
          read more.
          </a>
        </p>
      </div>
    );
  }
}

export default Radium(CollaborateSection);
