import React, { PropTypes } from 'react';
import Radium from 'radium';
import { remove } from 'lodash';

import { arrayOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import ArticleContent from 'components/common/article-content';
import StoryMedium from 'components/stories/story-medium';
import ArticleSmall from 'components/common/article-small';
import SectionHeader from 'components/common/section-header';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop, wrapperStyle
} from './stories.style';



class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
  }

  getFeaturedStory() {
    let restStories = this.props.stories.slice(0);
    let featuredStory = remove(restStories, (story) => {
      return story.id === this.props.featuredStoryId;
    })[0];
    return [featuredStory, restStories];
  }

  renderSmallStoriesTablet(stories) {
    return stories.map((story, ind) => {
      return (
        <ArticleSmall
          style={ ind === 0 ? firstSmallStoryStyleTablet : null }
          key={ story.id } header={ story.paper }>
          <ArticleContent>{ story.title }</ArticleContent>
        </ArticleSmall>
      );
    });
  }

  renderSmallStoriesDesktop(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <ArticleSmall
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null }
            header={ story.paper }>
            <ArticleContent>{ story.title }</ArticleContent>
          </ArticleSmall>
        </div>
      );
    });
  }

  renderTablet() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>Featured Stories</SectionHeader>
        </div>
        <div className='pure-u-3-4'>
          <StoryMedium story={ featuredStory }/>
        </div>
        <div className='pure-u-1-4'>
          { this.renderSmallStoriesTablet(restStories) }
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderDesktop() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>Featured Stories</SectionHeader>
        </div>
        <div className='pure-u-3-5'>
          <StoryMedium story={ featuredStory }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderSmallStoriesDesktop(restStories) }
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  featuredStoryId: PropTypes.number,
  stories: arrayOfN(3)
};

export default Radium(Stories);
