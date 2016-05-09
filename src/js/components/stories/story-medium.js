import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveComponent from 'components/responsive/responsive-component';
import CoverImage from 'components/common/cover-image';
import {
  storyWrapperStyle, storyWrapperStyleTablet,
  storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop
} from './story-medium.style';



class StoryMedium extends ResponsiveComponent {
  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    return (
      <div className='pure-g'>
        <div className='pure-u-2-3'>
          <CoverImage style={ storyImageStyleTablet } src={ this.props.story.imageUrl }/>
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
          <CoverImage style={ storyImageStyleDesktop } src={ this.props.story.imageUrl }/>
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

StoryMedium.defaultProps = {
  story: {
    id: 1,
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
    imageUrl: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
  }
};

export default Radium(StoryMedium);
