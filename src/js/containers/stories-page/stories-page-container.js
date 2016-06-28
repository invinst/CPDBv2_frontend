import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { arrayOfN } from 'utils/prop-validators';
import { requestStories } from 'actions/stories-page';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import {
  dataAvailableSelector, featuredStoryGroupsSelector, nonFeaturedStoriesSelector
} from 'selectors/stories-page/stories-selector';
import FeaturedStories from 'components/stories-page/featured-stories';
import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoriesPagePlaceHolder from 'components/stories-page/stories-page-place-holder';


export class UnconnectedStoriesPageContainer extends Component {
  componentDidMount() {
    this.props.requestStories();
  }

  render() {
    const { dataAvailable, featuredStoryGroups, nonFeaturedStories, openBottomSheetWithStory } = this.props;

    if (dataAvailable) {
      return (
        <div>
          <FeaturedStories storyGroups={ featuredStoryGroups } handleStoryClick={ openBottomSheetWithStory }/>
          <NonFeaturedStories stories={ nonFeaturedStories } handleStoryClick={ openBottomSheetWithStory }/>
        </div>
      );
    } else {
      return (
        <StoriesPagePlaceHolder/>
      );
    }
  }
}

UnconnectedStoriesPageContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  nonFeaturedStories: PropTypes.array,
  featuredStoryGroups: PropTypes.arrayOf(PropTypes.shape({
    imageStory: PropTypes.object,
    noImageStories: arrayOfN(2)
  })),
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    featuredStoryGroups: featuredStoryGroupsSelector(state),
    nonFeaturedStories: nonFeaturedStoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedStoriesPageContainer);
