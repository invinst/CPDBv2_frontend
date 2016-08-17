import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { arrayOfN } from 'utils/prop-validators';
import { requestStories } from 'actions/stories-page/featured-stories';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import {
  dataAvailableSelector, featuredStoryGroupsSelector
} from 'selectors/stories-page/featured-stories-selector';
import FeaturedStories from 'components/stories-page/featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


export class UnconnectedFeaturedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({ 'is_featured': 'True' });
  }

  render() {
    const { dataAvailable, featuredStoryGroups, openBottomSheetWithStory } = this.props;

    if (dataAvailable) {
      return (
        <FeaturedStories storyGroups={ featuredStoryGroups } handleStoryClick={ openBottomSheetWithStory }/>
      );
    } else {
      return (
        <StoriesPlaceHolder/>
      );
    }
  }
}

UnconnectedFeaturedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  featuredStoryGroups: PropTypes.arrayOf(PropTypes.shape({
    imageStory: PropTypes.object,
    noImageStories: arrayOfN(2)
  })),
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    featuredStoryGroups: featuredStoryGroupsSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFeaturedStoriesContainer);
