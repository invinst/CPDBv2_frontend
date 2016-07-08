import React, { PropTypes } from 'react';

import NonFeaturedStory from './non-featured-story';
import ResponsiveComponent from 'components/responsive/responsive-component';
import { buildLayout } from 'utils/layouts/non-featured-stories/hide-image';
import LoadingIndicator from './loading-indicator';


export default class NonFeaturedStories extends ResponsiveComponent {
  renderStoryGrid(grids) {
    const { stories, handleStoryClick } = this.props;
    const layouts = buildLayout(stories, grids);

    return stories.map((story, ind) => {
      return (
        <NonFeaturedStory key={ ind }
          handleClick={ handleStoryClick }
          story={ story }
          layout={ layouts[story.id] }/>
      );
    });
  }

  renderTablet() {
    const { moreDataAvailable } = this.props;

    return (
      <div className='pure-g'>
        { this.renderStoryGrid(4) }
        <div className='pure-u-1-1'>
          { moreDataAvailable ? null : <LoadingIndicator /> }
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { moreDataAvailable } = this.props;

    return (
      <div className='pure-g'>
        { this.renderStoryGrid(5) }
        <div className='pure-u-1-1'>
          { moreDataAvailable ? null : <LoadingIndicator /> }
        </div>
      </div>
    );
  }
}

NonFeaturedStories.propTypes = {
  stories: PropTypes.array,
  handleStoryClick: PropTypes.func,
  moreDataAvailable: PropTypes.bool
};
