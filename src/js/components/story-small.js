import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {DESKTOP, TABLET, MOBILE} from 'components/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, mobileWrapperStyle, closeButtonWrapperStyle
} from 'components/story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
  }

  responsiveStyle() {
    return {
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle]
      },
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle]
      },
      [MOBILE]: {
        wrapper: [wrapperStyle, mobileWrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle]
      }
    };
  }

  onOpen() {
    if (!this.props.expanded) {
      this.props.onOpen(this.props.story);
    }
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ style.wrapper } onClick={ this.onOpen }>
        <ArticleHeader>{ this.props.story.paper }</ArticleHeader>
        <ArticleContent>{ this.props.story.title }</ArticleContent>
        { this.props.expanded ?
          <div style={ style.closeButtonWrapper }><button onClick={ this.props.onClose }>X</button></div>
          : null
        }
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
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

export default Radium(StorySmall);
