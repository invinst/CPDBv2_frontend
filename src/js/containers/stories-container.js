import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';


import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';


export class StoriesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestStories());
  }

  shouldNotRender() {
    const { isRequesting, stories } = this.props;
    return isRequesting || stories.length !== 3;
  }

  render() {
    const { isRequesting, stories, featuredStoryId } = this.props;

    return this.shouldNotRender() ? null :
      <Stories stories={ stories } featuredStoryId={ featuredStoryId } isRequesting={ isRequesting }/>;
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
