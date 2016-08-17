import React, { Component, PropTypes } from 'react';

import SectionHeader from 'components/common/section-header';
import ArticleFooter from 'components/common/article-footer';
import Stories from './stories';
import { wrapperStyle } from './stories-section.style';
import { arrayOfN } from 'utils/prop-validators';
import { STORIES_PATH } from 'utils/constants';


export default class FeaturedStoriesSection extends Component {
  render() {
    const { imageStory, noImageStories, handleStoryClick } = this.props;

    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>Featured Stories</SectionHeader>
        </div>
        <Stories imageStory={ imageStory } noImageStories={ noImageStories } handleStoryClick={ handleStoryClick }/>
        <div className='pure-u-1-1'>
          <ArticleFooter to={ STORIES_PATH }>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

FeaturedStoriesSection.propTypes = {
  handleStoryClick: PropTypes.func.isRequired,
  imageStory: PropTypes.object,
  noImageStories: arrayOfN(2)
};
