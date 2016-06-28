import React, { Component, PropTypes } from 'react';

import { arrayOfN } from 'utils/prop-validators';
import FeaturedStoryGroup from './featured-story-group';
import { rowStyle } from './featured-stories.style';


export default class FeaturedStories extends Component {
  render() {
    const { storyGroups, handleStoryClick } = this.props;

    return (
      <div>
        <div>
          <FeaturedStoryGroup
            key={ 0 }
            imageStory={ storyGroups[0].imageStory }
            noImageStories={ storyGroups[0].noImageStories }
            handleStoryClick={ handleStoryClick }/>
        </div>
        <div style={ rowStyle }>
          <FeaturedStoryGroup
            key={ 1 }
            imageStory={ storyGroups[1].imageStory }
            noImageStories={ storyGroups[1].noImageStories }
            handleStoryClick={ handleStoryClick } leftAlign={ false }/>
        </div>
      </div>
    );
  }
}

FeaturedStories.propTypes = {
  storyGroups: PropTypes.arrayOf(
    PropTypes.shape({
      imageStory: PropTypes.object,
      noImageStories: arrayOfN(2)
    })
  ),
  handleStoryClick: PropTypes.func
};
