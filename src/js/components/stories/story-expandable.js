import React, { PropTypes } from 'react';

import ExpandTransition from 'components/animation/expand-transition';
import StoryFull from 'components/stories/story-full';
import { TOP, BOTTOM } from 'utils/constants';


export default class StoryExpandable extends React.Component {
  renderFullStoryAnimation() {
    return (
      <ExpandTransition
        childKey={ this.props.childKey }
        onFullyClosed={ this.props.onFullyClosed }
        onExpandingBegin={ this.props.onExpandingBegin }>
        <StoryFull className='pure-u-1-1'/>
      </ExpandTransition>
    );
  }

  render() {
    if (this.props.expandDirection === TOP) {
      return (
        <div>
          { this.renderFullStoryAnimation() }
          { this.props.children }
        </div>
      );
    } else if (this.props.expandDirection === BOTTOM) {
      return (
        <div>
          { this.props.children }
          { this.renderFullStoryAnimation() }
        </div>
      );
    }
  }
}

StoryExpandable.propTypes = {
  children: PropTypes.node,
  expandDirection: PropTypes.string,
  childKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onExpandingBegin: PropTypes.func,
  onFullyClosed: PropTypes.func
};

StoryExpandable.defaultProps = {
  expandDirection: BOTTOM
};
