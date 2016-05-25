import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { featuredStorySelector, dataAvailableSelector, smallStoriesSelector } from 'selectors/stories-selector';
import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';
import StoriesPlaceHolder from 'components/stories/stories-place-holder';


export class StoriesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestStories());
  }

  render() {
    const { dataAvailable, smallStories, featuredStory } = this.props;

    return (
      !dataAvailable ?
        <StoriesPlaceHolder/> :
        <Stories smallStories={ smallStories } featuredStory={ featuredStory }/>
    );
  }
}

StoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  smallStories: PropTypes.array,
  featuredStory: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    smallStories: smallStoriesSelector(state),
    featuredStory: featuredStorySelector(state)
  };
}

export default connect(mapStateToProps)(StoriesContainer);
