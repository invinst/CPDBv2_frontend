import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestStories } from 'actions/stories-page/featured-stories';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import {
  dataAvailableSelector, featuredStoriesSelector
} from 'selectors/stories-page/featured-stories-selector';
import FeaturedStories from 'components/stories-page/featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


export class UnconnectedFeaturedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({ 'limit': 15, 'ordering': '-is_featured,path' });
  }

  render() {
    const { dataAvailable, featuredStories, openBottomSheetWithStory } = this.props;

    if (dataAvailable) {
      return (
        <FeaturedStories stories={ featuredStories } onStoryClick={ openBottomSheetWithStory }/>
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
  featuredStories: PropTypes.arrayOf(PropTypes.object),
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    featuredStories: featuredStoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFeaturedStoriesContainer);
