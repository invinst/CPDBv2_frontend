import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { featuredStorySelector, dataAvailableSelector, smallStoriesSelector } from 'selectors/stories-selector';
import Stories from 'components/stories/stories';
import { requestStories } from 'actions/story-app';
import { openBottomSheetWithStory } from 'actions/bottom-sheet';
import StoriesPlaceHolder from 'components/stories/stories-place-holder';


export class UnconnectedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({}, this.context.adapter);
  }

  render() {
    const { dataAvailable, smallStories, featuredStory } = this.props;

    return (
      !dataAvailable ?
        <StoriesPlaceHolder/> :
        <Stories
          smallStories={ smallStories } featuredStory={ featuredStory }
          onStoryClick={ this.props.openBottomSheetWithStory }/>
    );
  }
}

UnconnectedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  smallStories: PropTypes.array,
  featuredStory: PropTypes.object
};

UnconnectedStoriesContainer.contextTypes = {
  adapter: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    smallStories: smallStoriesSelector(state),
    featuredStory: featuredStorySelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedStoriesContainer);
