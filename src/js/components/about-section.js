import React, { PropTypes } from 'react';

import ArticleSmall from 'components/common/article-small';
import ArticleContent from 'components/common/article-content';
import UnderlinedLink from 'components/common/underlined-link';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  articleTabletStyle, articleDesktopStyle
} from './about-section.style';


export default class AboutSection extends ResponsiveComponent {
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

  renderCollaborationArticle() {
    return (
      <div>
        <ArticleContent>
          We are collecting and publishing information that sheds light on police misconduct.
        </ArticleContent>
        <ArticleContent>
          If you have documents or datasets you would like to publish,
          please <UnderlinedLink href='mailto:records@invisibleinstitute.com'>email us.</UnderlinedLink>
        </ArticleContent>
      </div>
    );
  }

  renderTablet() {
    return (
      <div>
        <ArticleSmall
          style={ articleTabletStyle }
          header='About CPDP'>
          { this.renderAboutArticle() }
        </ArticleSmall>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div>
        <ArticleSmall
          style={ articleDesktopStyle }
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
