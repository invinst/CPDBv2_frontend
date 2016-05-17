import React, { PropTypes } from 'react';
import Radium from 'radium';

import { arrayOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import ArticleContent from 'components/common/article-content';
import StoryMedium from 'components/stories/story-medium';
import ArticleSmall from 'components/common/article-small';
import Expandable from 'components/common/expandable';
import StoryFull from 'components/stories/story-full';
import { TOP, BOTTOM } from 'utils/constants';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop, wrapperStyle
} from './stories.style';


const StoryExpandable = Expandable(StoryFull, { className: 'pure-u-1-1' });

class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryKey: null,
      storyExpanded: {},
      expandDirection: BOTTOM
    };
    this.onStoryOpen = ([id, dir]) => { this.setState({ selectedStoryKey: id, expandDirection: dir }); };
    this.onStoryClose = ([id, dir]) => { this.setState({ selectedStoryKey: null }); };
    this.onStoryFullyClosed = key => { this.setState({ storyExpanded: { [key]: false } }); };
    this.onStoryExpandingBegin = key => { this.setState({ storyExpanded: { [key]: true } }); };
  }

  renderSmallStoriesTablet(stories) {
    return stories.map((story, ind) => {
      return (
        <ArticleSmall
          style={ ind === 0 ? firstSmallStoryStyleTablet : null }
          onOpen={ this.onStoryOpen } key={ story.id }
          onClose={ this.onStoryClose }
          expanded={ this.state.storyExpanded[story.id] }
          identifier={ [story.id, ind === 0 ? TOP : BOTTOM] }
          expandDirection={ ind === 0 ? TOP : BOTTOM }
          header={ story.paper }
          active={ story.id === this.state.selectedStoryKey }>
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
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.storyExpanded[story.id] }
            identifier={ [story.id, BOTTOM] }
            expandDirection={ BOTTOM }
            header={ story.paper }
            active={ story.id === this.state.selectedStoryKey }>
            <ArticleContent>{ story.title }</ArticleContent>
          </ArticleSmall>
        </div>
      );
    });
  }

  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    const { featuredStory, smallStories } = this.props;
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <StoryExpandable
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ this.onStoryFullyClosed }
          onExpansionBegin={ this.onStoryExpandingBegin }
          expandDirection={ this.state.expandDirection }>
          <div className='pure-u-3-4'>
            <StoryMedium
              story={ featuredStory }
              onOpen={ this.onStoryOpen }
              onClose={ this.onStoryClose }
              expanded={ this.state.storyExpanded[featuredStory.id] }
              identifier={ [featuredStory.id, BOTTOM] }
              active={ featuredStory.id === this.state.selectedStoryKey }/>
          </div>
          <div className='pure-u-1-4'>
            { this.renderSmallStoriesTablet(smallStories) }
          </div>
        </StoryExpandable>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { featuredStory, smallStories } = this.props;
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <StoryExpandable
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ this.onStoryFullyClosed }
          onExpansionBegin={ this.onStoryExpandingBegin }
          expandDirection={ this.state.expandDirection }>
          <div className='pure-u-3-5'>
            <StoryMedium
              story={ featuredStory }
              onOpen={ this.onStoryOpen }
              onClose={ this.onStoryClose }
              expanded={ this.state.storyExpanded[featuredStory.id] }
              identifier={ [featuredStory.id, BOTTOM] }
              active={ featuredStory.id === this.state.selectedStoryKey }/>
          </div>
          <div className='pure-g pure-u-2-5'>
            { this.renderSmallStoriesDesktop(smallStories) }
          </div>
        </StoryExpandable>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  featuredStory: PropTypes.object,
  smallStories: arrayOfN(2)
};

export default Radium(Stories);
