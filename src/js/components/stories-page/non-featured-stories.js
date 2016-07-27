import React, { PropTypes } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import Story, { SMALL_TITLE_STYLE, NORMAL_TITLE_STYLE } from 'components/common/story/story';


export default class NonFeaturedStories extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapperClassName: 'pure-u-1-4',
        storyTitleSize: NORMAL_TITLE_STYLE
      },
      [DESKTOP]: {
        wrapperClassName: 'pure-u-1-4',
        storyTitleSize: SMALL_TITLE_STYLE
      },
      [TABLET]: {
        wrapperClassName: 'pure-u-1-2',
        storyTitleSize: SMALL_TITLE_STYLE
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { stories, onStoryClick } = this.props;

    return (
      <div className='pure-g'>
        {
          stories.map((story, ind) => {
            return (
              <div key={ ind } className={ style.wrapperClassName }>
                <Story story={ story } onClick={ onStoryClick } storyTitleSize={ style.storyTitleSize }/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

NonFeaturedStories.propTypes = {
  stories: PropTypes.array,
  onStoryClick: PropTypes.func
};
