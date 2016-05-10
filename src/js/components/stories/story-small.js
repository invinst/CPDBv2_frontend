import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import CloseButtonWrapper from 'components/stories/close-btn-wrapper';
import Toggleable from 'components/common/toggleable';
import ResponsiveStyleComponent, { DESKTOP, TABLET, MOBILE } from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle
} from './story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [MOBILE]: TABLET,
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style],
        content: [contentStyle]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style],
        content: [contentStyle]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='story-small' style={ style.wrapper }>
        <div style={ style.content }>
          <ArticleHeader>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
        <CloseButtonWrapper
          expanded={ this.props.expanded } showButton={ this.props.active }
          position={ this.props.expandDirection }
          buttonClassName='story-small__close-button'/>
      </div>
    );
  }
}

StorySmall.propTypes = {
  style: PropTypes.object,
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  expanded: PropTypes.bool,
  expandDirection: PropTypes.string,
  active: PropTypes.bool
};

StorySmall.defaultProps = {
  story: {
    id: 2,
    paper: 'FiveThirtyEight',
    title: 'How to predict bad cops in Chicago.'
  }
};

export default Toggleable(Radium(StorySmall));
