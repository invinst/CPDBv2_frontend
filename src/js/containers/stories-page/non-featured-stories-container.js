import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestStories, loadMoreStories } from 'actions/stories-page/non-featured-stories';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import {
  dataAvailableSelector, nonFeaturedStoriesSelector, paginationSelector
} from 'selectors/stories-page/non-featured-stories-selector';
import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


export class UnconnectedNonFeaturedStoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.props.requestStories({ 'is_featured': 'False', 'ordering': '-first_published_at' });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { loadMoreStories, pagination } = this.props;

    if ((window.scrollY + window.innerHeight >= window.document.body.offsetHeight) && pagination.next) {
      loadMoreStories(pagination.next);
    }
  }

  render() {
    const { dataAvailable, nonFeaturedStories, openBottomSheetWithStory } = this.props;

    if (dataAvailable) {
      return (
        <NonFeaturedStories stories={ nonFeaturedStories } handleStoryClick={ openBottomSheetWithStory }/>
      );
    } else {
      return (
        <StoriesPlaceHolder/>
      );
    }
  }
}

UnconnectedNonFeaturedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  loadMoreStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  nonFeaturedStories: PropTypes.array,
  pagination: PropTypes.object,
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    nonFeaturedStories: nonFeaturedStoriesSelector(state),
    pagination: paginationSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  loadMoreStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedNonFeaturedStoriesContainer);
