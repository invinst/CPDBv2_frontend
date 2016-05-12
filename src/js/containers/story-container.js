import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { listOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import StoryMedium from 'components/stories/story-medium';
import StorySmall from 'components/stories/story-small';
import StoryExpanded from 'components/stories/story-expanded';
import ResponsiveComponent from 'components/responsive/responsive-component';
import ExpandTransition from 'components/animation/expand-transition';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from './story-container.style';
import { loadStories } from 'actions/story-app';


class RawStory extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryKey: null,
      storyExpanded: {}
    };
    this.onStoryOpen = id => { this.setState({ selectedStoryKey: id }); };
    this.onStoryClose = id => { this.setState({ selectedStoryKey: null }); };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadStories());
  }

  getFeaturedStory() {
    const { stories, featuredStoryId } = this.props;
    const featuredStory = stories.find(story => story.id===featuredStoryId);
    const restStories = stories.filterNot(story => story.id===featuredStoryId);

    return [featuredStory, restStories];
  }

  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    return (
      <div className='pure-g'>
        <div className='pure-u-3-4'>
          <StoryMedium story={ this.props.stories[0] }/>
        </div>
        <div className='pure-u-1-4'>
          <StorySmall style={ firstSmallStoryStyleTablet } story={ this.props.stories[1] }/>
          <StorySmall story={ this.props.stories[2] }/>
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderSmallStories(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <StorySmall
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null } story={ story }
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.storyExpanded[story.id] } identifier={ story.id }
            active={ story.id === this.state.selectedStoryKey }/>
        </div>
      );
    });
  }

  renderDesktop() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g'>
        <div className='pure-u-3-5'>
          <StoryMedium
            story={ featuredStory }
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.storyExpanded[featuredStory.id] } identifier={ featuredStory.id }
            active={ featuredStory.id === this.state.selectedStoryKey }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderSmallStories(restStories) }
        </div>
        <ExpandTransition
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ (key) => {this.setState({ storyExpanded: { [key]: false } });} }
          onExpansionBegin={ (key) => {this.setState({ storyExpanded: { [key]: true } });} }>
          <StoryExpanded className='pure-u-1-1'/>
        </ExpandTransition>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

RawStory.propTypes = {
  featuredStoryId: PropTypes.number,
  stories: listOfN(3),
  dispatch: PropTypes.func.isRequired
};

RawStory.defaultProps = {
  featuredStoryId: 1
};

function mapStateToProps(state) {
  const { stories, isRequesting } = state;
  return {
    stories,
    isRequesting
  };
}

export const StoryContainer = Radium(RawStory);

export default connect(mapStateToProps)(StoryContainer);
