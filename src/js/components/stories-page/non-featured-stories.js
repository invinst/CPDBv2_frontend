import React, { PropTypes } from 'react';

import NonFeaturedStory from './non-featured-story';
import ResponsiveComponent from 'components/responsive/responsive-component';


export default class NonFeaturedStories extends ResponsiveComponent {
  renderStoryGrid(grids) {
    const { stories } = this.props;

    let position = 0;
    return stories.map((story, ind) => {
      let isDisplayImage = !!story.imageUrl;
      let storyPosition = position;

      position += isDisplayImage ? 2 : 1;
      if (position > grids) {
        isDisplayImage = false;
      }
      if (position > grids - 1) {
        position = 0;
      }

      return (
        <NonFeaturedStory key={ ind }
          handleClick={ this.props.handleStoryClick }
          story={ story }
          grids={ grids }
          position={ storyPosition }
          isDisplayImage={ isDisplayImage }/>
      );
    });
  }

  renderTablet() {
    return (
      <div className='pure-g'>
        { this.renderStoryGrid(4) }
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className='pure-g'>
        { this.renderStoryGrid(5) }
      </div>
    );
  }
}

NonFeaturedStories.propTypes = {
  stories: PropTypes.array,
  handleStoryClick: PropTypes.func
};
