import React, { Component, PropTypes } from 'react';

import Stories from './stories';
import { arrayOfN } from 'utils/prop-validators';


export default class FeaturedStoriesSection extends Component {
  render() {
    const { imageStory, noImageStories, handleStoryClick } = this.props;

    return (
      <Stories imageStory={ imageStory } noImageStories={ noImageStories } handleStoryClick={ handleStoryClick }/>
    );
  }
}

FeaturedStoriesSection.propTypes = {
  handleStoryClick: PropTypes.func.isRequired,
  imageStory: PropTypes.object,
  noImageStories: arrayOfN(2)
};
