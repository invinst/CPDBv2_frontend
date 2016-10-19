import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestStories } from 'actions/stories-page';
import { openBottomSheetWithReport } from 'actions/bottom-sheet';
import {
  dataAvailableSelector, storiesSelector
} from 'selectors/stories-page/stories-selector';
import FeaturedStories from 'components/stories-page/featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


export class UnconnectedFeaturedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({ 'limit': 15, 'ordering': '-is_featured,path' });
  }

  render() {
    const { dataAvailable, featuredStories, openBottomSheetWithReport } = this.props;

    if (dataAvailable) {
      return (
        <FeaturedStories stories={ featuredStories } onStoryClick={ openBottomSheetWithReport }/>
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
  openBottomSheetWithReport: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  featuredStories: PropTypes.arrayOf(PropTypes.object),
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    featuredStories: storiesSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithReport
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFeaturedStoriesContainer);
