import React, { Component } from 'react';

import ArticleHeader from 'components/common/article-header';
import {
  articleHeaderStyle, sectionStyle, articleContentStyle, underlinedLinkStyle
} from './collaborate-section.style';
import ArticleContent from 'components/common/article-content';
import UnderlinedLink from 'components/common/underlined-link';


export default class CollaborateSection extends Component {
  render() {
    return (
      <div style={ sectionStyle }>
        <ArticleHeader style={ articleHeaderStyle }>
          Collaborate with Us
        </ArticleHeader>
        <ArticleContent style={ articleContentStyle }>
          We are collecting and publishing information that sheds light on police misconduct.
        </ArticleContent>
        <ArticleContent style={ articleContentStyle }>
          If you have documents or datasets you would like to publish,
          please <UnderlinedLink style={ underlinedLinkStyle } href='mailto:records@invisibleinstitute.com'>
          email us,</UnderlinedLink> or <UnderlinedLink href='#' style={ underlinedLinkStyle }>
          read more.
          </UnderlinedLink>
        </ArticleContent>
      </div>
    );
  }
}
