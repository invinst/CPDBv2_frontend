import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';


import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';
import StoriesPlaceHolder from 'components/stories/stories-place-holder';


export class StoriesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestStories());
  }

  isRequesting() {
    const { isRequesting, stories } = this.props;
    return isRequesting || stories.length !== 3;
  }

  render() {
    const { stories, featuredStoryId } = this.props;

    return this.isRequesting() ? <StoriesPlaceHolder/> :
      <Stories stories={ stories } featuredStoryId={ featuredStoryId }/>;
  }
}

StoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRequesting: PropTypes.bool,
  stories: PropTypes.array,
  featuredStoryId: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  const { isRequesting, stories, featuredStoryId } = state.storyApp;

  return {
    isRequesting,
    stories,
    featuredStoryId
  };
}

export default connect(mapStateToProps)(StoriesContainer);
