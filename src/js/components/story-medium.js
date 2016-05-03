import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveComponent from 'components/responsive-component';
import FeaturedStoryImage from 'components/featured-story-image';
import {
  storyWrapperStyle, storyWrapperStyleTablet, storyWrapperStyleMobile,
  storyImageStyleMobile, storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop
} from 'components/story-medium.style';



class StoryMedium extends ResponsiveComponent {
  renderMobile() {
    return (
      <div>
        <FeaturedStoryImage
          style={ storyImageStyleMobile } src={ this.props.story.imageUrl }/>
        <div>
          <div style={ [storyWrapperStyle, storyWrapperStyleMobile] }>
            <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
            <ArticleContent>{ this.props.story.title }</ArticleContent>
          </div>
        </div>
      </div>
    );
  }

  renderTablet() {
    return (
      <div className='pure-g'>
        <div className='pure-u-2-3'>
          <FeaturedStoryImage style={ storyImageStyleTablet } src={ this.props.story.imageUrl }/>
        </div>
        <div className='pure-u-1-3'>
          <div style={ [storyWrapperStyle, storyWrapperStyleTablet] }>
            <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
            <ArticleContent>{ this.props.story.title }</ArticleContent>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className='pure-g'>
        <div className='pure-u-2-3'>
          <FeaturedStoryImage style={ storyImageStyleDesktop } src={ this.props.story.imageUrl }/>
        </div>
        <div className='pure-u-1-3'>
          <div style={ storyWrapperStyle }>
            <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
            <ArticleContent>{ this.props.story.title }</ArticleContent>
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
  })
};

export default Radium(StoryMedium);
