import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import {
  imageStorySelector, dataAvailableSelector, noImageStoriesSelector
} from 'selectors/landing-page/stories-selector';
import StoriesSection from 'components/landing-page/stories/stories-section';
import { requestStories } from 'actions/landing-page/story-app';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import StoriesPlaceHolder from 'components/landing-page/stories/stories-place-holder';


export class UnconnectedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({ limit: 3, 'is_featured': 'True' }, this.context.adapter);
  }

  render() {
    const { dataAvailable, imageStory, noImageStories } = this.props;

    return (
      !dataAvailable ?
        <StoriesPlaceHolder/> :
        <StoriesSection
          handleStoryClick={ this.props.openBottomSheetWithStory }
          imageStory={ imageStory }
          noImageStories={ noImageStories }/>
    );
  }
}

UnconnectedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  noImageStories: PropTypes.array,
  imageStory: PropTypes.object
};

UnconnectedStoriesContainer.contextTypes = {
  adapter: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    imageStory: imageStorySelector(state),
    noImageStories: noImageStoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedStoriesContainer);
