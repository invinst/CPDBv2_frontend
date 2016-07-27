import React, { PropTypes } from 'react';
import { includes } from 'lodash';

import ResponsiveComponent from 'components/responsive/responsive-component';
import StoryGroup from 'components/common/story/story-group';
import StorySeparator from 'components/common/story/story-separator';
import { buildStoriesLayout } from 'utils/layouts/stories-page/featured-stories';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './featured-stories.style';


export default class FeaturedStories extends ResponsiveComponent {
  renderStoryGroups(groups) {
    const { onStoryClick } = this.props;

    return groups.map((layoutGroup, ind) => {
      return (
        <StoryGroup
          key={ ind }
          stories={ layoutGroup.group }
          onClick={ onStoryClick }
          storyTitleSize={ layoutGroup.storyTitleSize }
          hasBorderBottom={ ind < groups.length - 1 }/>
      );
    });
  }

  renderTablet() {
    const { stories } = this.props;
    const layoutGroups = buildStoriesLayout(stories, TABLET);

    const topLeftGroups = layoutGroups.filter(layoutGroup => includes([0, 2, 4, 6], layoutGroup.ind));
    const topRightGroups = layoutGroups.filter(layoutGroup => includes([1, 3, 5, 7], layoutGroup.ind));
    const middleGroup = layoutGroups.filter(layoutGroup => includes([8], layoutGroup.ind));
    const bottomLeftGroups = layoutGroups.filter(layoutGroup => includes([9, 11, 13], layoutGroup.ind));
    const bottomRightGroups = layoutGroups.filter(layoutGroup => includes([10, 12, 14], layoutGroup.ind));

    return (
      <div style={ wrapperStyle }>
        <div className='pure-g'>
          <div className='pure-u-1-2'>
            { this.renderStoryGroups(topLeftGroups) }
          </div>
          <div className='pure-u-1-2'>
            { this.renderStoryGroups(topRightGroups) }
          </div>
          <StorySeparator/>
          <div className='pure-u-1-1'>
            { this.renderStoryGroups(middleGroup) }
          </div>
          <StorySeparator/>
          <div className='pure-u-1-2'>
            { this.renderStoryGroups(bottomLeftGroups) }
          </div>
          <div className='pure-u-1-2'>
            { this.renderStoryGroups(bottomRightGroups) }
          </div>
          <StorySeparator/>
        </div>
      </div>
    );
  }

  renderForDesktopAndExtraWide(screen) {
    const { stories } = this.props;

    const layoutGroups = buildStoriesLayout(stories, screen);

    const leftGroups = layoutGroups.filter(layoutGroup => includes([0, 2, 4, 6, 8], layoutGroup.ind));
    const rightGroups = layoutGroups.filter(layoutGroup => includes([1, 3, 5, 7, 9, 10], layoutGroup.ind));

    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-2'>
          { this.renderStoryGroups(leftGroups) }
        </div>
        <div className='pure-u-1-2'>
          { this.renderStoryGroups(rightGroups) }
        </div>
        <StorySeparator/>
      </div>
    );
  }

  renderDesktop() {
    return this.renderForDesktopAndExtraWide(DESKTOP);
  }

  renderExtraWide() {
    return this.renderForDesktopAndExtraWide(EXTRA_WIDE);
  }
}

FeaturedStories.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object),
  onStoryClick: PropTypes.func
};
