import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { arrayOfN } from 'utils/prop-validators';
import StoryWithImage from 'components/landing-page/stories/story-with-image';
import StoryNoImage from 'components/landing-page/stories/story-no-image';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstNoImageStoryStyleTablet, firstNoImageStoryDesktop, secondNoImageStoryStyleDesktop,
  wrapperStyle, secondNoImageStoryStyle, imageStoryStyle
} from './featured-story-group.style';


class FeaturedStoryGroup extends ResponsiveComponent {
  renderNoImageStoriesTablet(stories) {
    return stories.map((story, ind) => {
      return (
        <StoryNoImage key={ ind }
          handleClick={ this.props.handleStoryClick }
          style={ ind === 0 ? firstNoImageStoryStyleTablet : secondNoImageStoryStyle }
          story={ story }/>
      );
    });
  }

  renderNoImageStoriesDesktop(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <StoryNoImage
            handleClick={ this.props.handleStoryClick }
            style={ ind === 0 ? firstNoImageStoryDesktop : secondNoImageStoryStyleDesktop }
            story={ story }/>
        </div>
      );
    });
  }

  renderImageStory(story) {
    const { handleStoryClick, leftAlign } = this.props;

    return (
      <StoryWithImage
        story={ story }
        handleClick={ handleStoryClick }
        leftAlign={ leftAlign }
        style={ imageStoryStyle }/>
    );
  }

  renderTablet() {
    const { imageStory, noImageStories, leftAlign } = this.props;

    if (leftAlign) {
      return (
        <div className='pure-g' style={ wrapperStyle }>
          <div className='pure-u-3-4'>
            { this.renderImageStory(imageStory) }
          </div>
          <div className='pure-u-1-4'>
            { this.renderNoImageStoriesTablet(noImageStories) }
          </div>
        </div>
      );
    }

    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-4'>
          { this.renderNoImageStoriesTablet(noImageStories) }
        </div>
        <div className='pure-u-3-4'>
          { this.renderImageStory(imageStory) }
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { imageStory, noImageStories, leftAlign } = this.props;

    if (leftAlign) {
      return (
        <div className='pure-g'>
          <div className='pure-u-3-5'>
            { this.renderImageStory(imageStory) }
          </div>
          <div className='pure-g pure-u-2-5'>
            { this.renderNoImageStoriesDesktop(noImageStories) }
          </div>
        </div>
      );
    }
    return (
      <div className='pure-g'>
        <div className='pure-g pure-u-2-5'>
          { this.renderNoImageStoriesDesktop(noImageStories) }
        </div>
        <div className='pure-u-3-5'>
          { this.renderImageStory(imageStory) }
        </div>
      </div>
    );
  }
}

FeaturedStoryGroup.propTypes = {
  imageStory: PropTypes.object,
  noImageStories: arrayOfN(2),
  handleStoryClick: PropTypes.func,
  leftAlign: PropTypes.bool
};

FeaturedStoryGroup.defaultProps = {
  leftAlign: true
};

export default ConfiguredRadium(FeaturedStoryGroup);
