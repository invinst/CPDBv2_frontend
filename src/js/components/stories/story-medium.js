import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import CloseButtonWrapper from 'components/stories/close-btn-wrapper';
import ResponsiveStyleComponent, { MOBILE, TABLET, DESKTOP } from 'components/responsive/responsive-style-component';
import CoverImage from 'components/common/cover-image';
import {
  storyWrapperStyle, storyWrapperStyleTablet,
  storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop, contentStyle
} from './story-medium.style';



class StoryMedium extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  responsiveStyle() {
    return {
      [MOBILE]: TABLET,
      [TABLET]: {
        image: storyImageStyleTablet,
        content: contentStyle,
        wrapper: [storyWrapperStyle, storyWrapperStyleTablet],
        paper: [paperStyleDesktop]
      },
      [DESKTOP]: {
        image: storyImageStyleDesktop,
        content: contentStyle,
        wrapper: [storyWrapperStyle],
        paper: [paperStyleDesktop]
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
      <div className='pure-g' onClick={ this.onClick }>
        <div className='pure-u-2-3'>
          <CoverImage style={ style.image } src={ this.props.story.imageUrl }/>
        </div>
        <div className='pure-u-1-3'>
          <div style={ style.wrapper }>
            <div style={ style.content }>
              <ArticleHeader style={ style.paper }>{ this.props.story.paper }</ArticleHeader>
              <ArticleContent>{ this.props.story.title }</ArticleContent>
            </div>
            <CloseButtonWrapper expanded={ this.props.expanded } showButton={ this.props.active }/>
          </div>
        </div>
      </div>
    );
  }
}

StoryMedium.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }),
  active: PropTypes.bool,
  expanded: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

StoryMedium.defaultProps = {
  story: {
    id: 1,
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
    imageUrl: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
  }
};

export default Radium(StoryMedium);
