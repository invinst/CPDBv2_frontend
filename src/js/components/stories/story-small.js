import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import CloseButton from 'components/common/close-btn';
import ResponsiveStyleComponent, {DESKTOP, TABLET, MOBILE} from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, mobileWrapperStyle, closeButtonWrapperStyle, contentStyle
} from 'components/stories/story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
  }

  responsiveStyle() {
    return {
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle],
        content: [contentStyle]
      },
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle],
        content: [contentStyle]
      },
      [MOBILE]: {
        wrapper: [wrapperStyle, mobileWrapperStyle, this.props.style],
        closeButtonWrapper: [closeButtonWrapperStyle],
        content: [contentStyle]
      }
    };
  }

  onOpen() {
    if (!this.props.active) {
      this.props.onOpen(this.props.story);
    }
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='story-small' style={ style.wrapper } onClick={ this.onOpen }>
        <div style={ style.content }>
          <ArticleHeader>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
        { this.props.expanded ?
          <div style={ style.closeButtonWrapper }>
            { this.props.active ?
              <CloseButton onClick={ this.props.onClose } className='story-small__close-btn'/>
              : null
            }
          </div>
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
  active: PropTypes.bool,
  expanded: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

StorySmall.defaultProps = {
  story: {
    id: 2,
    paper: 'FiveThirtyEight',
    title: 'How to predict bad cops in Chicago.'
  }
};

export default Radium(StorySmall);
