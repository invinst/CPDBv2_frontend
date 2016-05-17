import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { featuredStorySelector, shouldRenderSelector, smallStoriesSelector } from 'selectors/stories-selector';
import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';
import StoriesPlaceHolder from 'components/stories/stories-place-holder';


export class StoriesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestStories());
  }

  render() {
    const { shouldRender, smallStories, featuredStory } = this.props;

    return (
      shouldRender ?
        <StoriesPlaceHolder/> :
        <Stories smallStories={ smallStories } featuredStory={ featuredStory }/>
    );
  }
}

StoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  shouldRender: PropTypes.bool,
  smallStories: PropTypes.array,
  featuredStory: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    shouldRender: shouldRenderSelector(state),
    smallStories: smallStoriesSelector(state),
    featuredStory: featuredStorySelector(state)
  };
}

export default connect(mapStateToProps)(StoriesContainer);
