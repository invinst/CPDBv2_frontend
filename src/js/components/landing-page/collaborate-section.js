import React from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ResponsiveStyleComponent, { TABLET, DESKTOP } from 'components/responsive/responsive-style-component';
import {
  articleHeaderStyle, sectionStyle, articleContentStyle, underlinedLinkStyle, wrapperStyle,
  contentFontSizeTablet, sectionTabletStyle
} from './collaborate-section.style';
import ArticleContent from 'components/common/article-content';
import UnderlinedLink from 'components/common/underlined-link';


class CollaborateSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        content: [articleContentStyle, contentFontSizeTablet],
        underlined: [underlinedLinkStyle, contentFontSizeTablet],
        section: [sectionStyle, sectionTabletStyle]
      },
      [DESKTOP]: {
        content: articleContentStyle,
        underlined: underlinedLinkStyle,
        section: sectionStyle
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <div style={ style.section }>
          <ArticleHeader style={ articleHeaderStyle }>
            Collaborate with Us
          </ArticleHeader>
          <ArticleContent style={ style.content }>
            We are collecting and publishing information that sheds light on police misconduct.
          </ArticleContent>
          <ArticleContent style={ style.content }>
            If you have documents or datasets you would like to publish,
            please <UnderlinedLink style={ style.underlined } href='mailto:records@invisibleinstitute.com'>
            email us,</UnderlinedLink> or <UnderlinedLink href='#' style={ style.underlined }>
            read more.
            </UnderlinedLink>
          </ArticleContent>
        </div>
      </div>
    );
  }
}

export default Radium(CollaborateSection);
