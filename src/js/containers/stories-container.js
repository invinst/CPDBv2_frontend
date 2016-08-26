import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import {
  storiesSelector, dataAvailableSelector
} from 'selectors/landing-page/stories-selector';
import { requestStories } from 'actions/landing-page/story-app';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import CoverageSectionContent from 'components/landing-page/coverage-section/coverage-section-content';
import StoriesPlaceHolder from 'components/landing-page/stories/stories-place-holder';


export class UnconnectedStoriesContainer extends Component {
  componentDidMount() {
    this.props.requestStories({ limit: 3, 'is_featured': 'True' }, this.context.adapter);
  }

  render() {
    const { dataAvailable, stories } = this.props;

    return (
      !dataAvailable ?
        <StoriesPlaceHolder/> :
        <CoverageSectionContent
          stories={ stories }
          onStoryClick={ this.props.openBottomSheetWithStory }/>
    );
  }
}

UnconnectedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  stories: PropTypes.array
};

UnconnectedStoriesContainer.contextTypes = {
  adapter: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    stories: storiesSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedStoriesContainer);
