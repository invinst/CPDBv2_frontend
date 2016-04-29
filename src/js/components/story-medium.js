import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveComponent from 'components/responsive-component';
import FeaturedStoryImage from 'components/featured-story-image';
import {
  storyWrapperStyleDesktop, storyWrapperStyleTablet, storyWrapperStyleMobile,
  storyImageStyleMobile, storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop
} from 'components/story-medium.style';



class StoryMedium extends ResponsiveComponent {
  renderMobile() {
    return (<div>
      <FeaturedStoryImage
        style={ storyImageStyleMobile } src={ this.props.story.url }/>
      <div>
        <div style={ storyWrapperStyleMobile }>
          <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
      </div>
    </div>);
  }

  renderTablet() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleTablet } src={ this.props.story.url }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ storyWrapperStyleTablet }>
          <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
      </div>
    </div>);
  }

  renderDesktop() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleDesktop } src={ this.props.story.url }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ storyWrapperStyleDesktop }>
          <ArticleHeader style={ paperStyleDesktop }>{ this.props.story.paper }</ArticleHeader>
          <ArticleContent>{ this.props.story.title }</ArticleContent>
        </div>
      </div>
    </div>);
  }
}

StoryMedium.propTypes = {
  story: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
};

StoryMedium.defaultProps = {
  story: {
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
    url: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
  }
};

export default Radium(StoryMedium);
