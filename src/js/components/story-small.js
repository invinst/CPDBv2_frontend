import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleTitle from 'components/common/article-title';
import ResponsiveStyleComponent, {DESKTOP, TABLET, MOBILE} from 'components/responsive-style-component';
import {wrapperStyle, tabletWrapperStyle, mobileWrapperStyle} from 'components/story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style]
      },
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style]
      },
      [MOBILE]: {
        wrapper: [wrapperStyle, mobileWrapperStyle, this.props.style]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (<div style={ style.wrapper }>
      <ArticleHeader>{ this.props.story.paper }</ArticleHeader>
      <ArticleTitle>{ this.props.story.title }</ArticleTitle>
    </div>);
  }
}

StorySmall.propTypes = {
  style: PropTypes.object,
  story: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

StorySmall.defaultProps = {
  story: {
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.'
  }
};

export default Radium(StorySmall);
