import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import CloseButton from 'components/common/close-btn';
import ResponsiveStyleComponent, { DESKTOP, TABLET, MOBILE } from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, closeButtonWrapperStyle, contentStyle
} from './story-small.style';


class StorySmall extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
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
      [MOBILE]: TABLET
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
        { this.props.expanded || this.props.active ?
          <div style={ style.closeButtonWrapper }>
            { this.props.active ?
              <CloseButton className='story-small__close-button'/>
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
