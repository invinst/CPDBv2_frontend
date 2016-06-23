import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { arrayOfN } from 'utils/prop-validators';
import StoryWithImage from './story-with-image';
import StoryNoImage from './story-no-image';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstNoImageStoryStyleTablet, firstNoImageStoryStyleDesktop, wrapperStyle, secondNoImageStoryStyle
} from './stories.style';


class Stories extends ResponsiveComponent {
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
            style={ ind === 0 ? firstNoImageStoryStyleDesktop : {} }
            story={ story }/>
        </div>
      );
    });
  }

  renderTablet() {
    const { imageStory, noImageStories, handleStoryClick } = this.props;

    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-3-4'>
          <StoryWithImage story={ imageStory } handleClick={ handleStoryClick }/>
        </div>
        <div className='pure-u-1-4'>
          { this.renderNoImageStoriesTablet(noImageStories) }
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { imageStory, noImageStories, handleStoryClick } = this.props;

    return (
      <div className='pure-g'>
        <div className='pure-u-3-5'>
          <StoryWithImage story={ imageStory } handleClick={ handleStoryClick }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderNoImageStoriesDesktop(noImageStories) }
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  imageStory: PropTypes.object,
  noImageStories: arrayOfN(2),
  handleStoryClick: PropTypes.func
};

export default ConfiguredRadium(Stories);
