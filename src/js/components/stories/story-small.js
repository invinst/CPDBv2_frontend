import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import CloseButtonWrapper from 'components/stories/close-btn-wrapper';
import ResponsiveStyleComponent, { DESKTOP, TABLET, MOBILE } from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle
} from './story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

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

  onClick() {
    if (!this.props.active) {
      this.props.onOpen(this.props.story);
    } else {
      this.props.onClose();
    }
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='story-small' style={ style.wrapper } onClick={ this.onClick }>
        <div style={ style.content }>
          <ArticleHeader>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
        <CloseButtonWrapper
          expanded={ this.props.expanded } showButton={ this.props.active }
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
