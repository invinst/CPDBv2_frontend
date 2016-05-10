import React, { PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';

import { arrayOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import StoryMedium from 'components/stories/story-medium';
import ArticleSmall from 'components/common/article-small';
import StoryExpandable from 'components/stories/story-expandable';
import { TOP, BOTTOM } from 'utils/constants';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from './stories.style';


class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryKey: null,
      StoryFull: {},
      expandDirection: BOTTOM
    };
    this.onStoryOpen = ([id, dir]) => { this.setState({ selectedStoryKey: id, expandDirection: dir }); };
    this.onStoryClose = ([id, dir]) => { this.setState({ selectedStoryKey: null }); };
    this.onStoryFullyClosed = key => { this.setState({ StoryFull: { [key]: false } }); };
    this.onStoryExpandingBegin = key => { this.setState({ StoryFull: { [key]: true } }); };
  }

  getFeaturedStory() {
    let restStories = this.props.stories.slice(0);
    let featuredStory = _.remove(restStories, (story) => {
      return story.id === this.props.featuredStoryId;
    })[0];
    return [featuredStory, restStories];
  }

  renderSmallStoriesTablet(stories) {
    return stories.map((story, ind) => {
      return (
        <ArticleSmall
          style={ ind === 0 ? firstSmallStoryStyleTablet : null } story={ story }
          onOpen={ this.onStoryOpen } key={ story.id }
          onClose={ this.onStoryClose }
          expanded={ this.state.StoryFull[story.id] }
          identifier={ [story.id, ind === 0 ? TOP : BOTTOM] }
          expandDirection={ ind === 0 ? TOP : BOTTOM }
          header={ story.paper } content={ story.title }
          active={ story.id === this.state.selectedStoryKey }/>
      );
    });
  }

  renderSmallStoriesDesktop(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <ArticleSmall
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null } story={ story }
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.StoryFull[story.id] }
            identifier={ [story.id, BOTTOM] }
            expandDirection={ BOTTOM }
            header={ story.paper } content={ story.title }
            active={ story.id === this.state.selectedStoryKey }/>
        </div>
      );
    });
  }

  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g'>
        <StoryExpandable
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ this.onStoryFullyClosed }
          onExpandingBegin={ this.onStoryExpandingBegin }
          expandDirection={ this.state.expandDirection }>
          <div className='pure-u-3-4'>
            <StoryMedium
              story={ featuredStory }
              onOpen={ this.onStoryOpen }
              onClose={ this.onStoryClose }
              expanded={ this.state.StoryFull[featuredStory.id] }
              identifier={ [featuredStory.id, BOTTOM] }
              active={ featuredStory.id === this.state.selectedStoryKey }/>
          </div>
          <div className='pure-u-1-4'>
            { this.renderSmallStoriesTablet(restStories) }
          </div>
        </StoryExpandable>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderDesktop() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g'>
        <StoryExpandable
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ this.onStoryFullyClosed }
          onExpandingBegin={ this.onStoryExpandingBegin }
          expandDirection={ this.state.expandDirection }>
          <div className='pure-u-3-5'>
            <StoryMedium
              story={ featuredStory }
              onOpen={ this.onStoryOpen }
              onClose={ this.onStoryClose }
              expanded={ this.state.StoryFull[featuredStory.id] }
              identifier={ [featuredStory.id, BOTTOM] }
              active={ featuredStory.id === this.state.selectedStoryKey }/>
          </div>
          <div className='pure-g pure-u-2-5'>
            { this.renderSmallStoriesDesktop(restStories) }
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
  featuredStoryId: PropTypes.number,
  stories: arrayOfN(3)
};

Stories.defaultProps = {
  featuredStoryId: 1,
  stories: [
    {
      id: 1,
      paper: 'New York Times',
      title: 'Complaints against Chicago Police rarely result in discipline data shows.',
      imageUrl: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
    },
    {
      id: 2,
      paper: 'FiveThirtyEight',
      title: 'How to predict bad cops in Chicago.'
    },
    {
      id: 3,
      paper: 'Chicago Magazine',
      title: 'The Laquan McDonald Video Didn\'t "Rip" Chicago Apart, but Now Its Leaders Face a Reckoning.'
    }
  ]
};

export default Radium(Stories);
