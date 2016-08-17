import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { wrapperStyle } from './story-group.style';
import Story from './story';
import StorySeparator from './story-separator';


export default class StoryGroup extends Component {
  render() {
    const { stories, hasBorderBottom, ...storyProps } = this.props;
    const wrapperClassName = classnames({
      'pure-u-1-1': stories.length == 1,
      'pure-u-1-2': stories.length > 1
    });

    return (
      <div className='pure-g' style={ wrapperStyle }>
        {
          stories.map((story, ind) => {
            return (
              <div key={ ind } className={ wrapperClassName }>
                <Story key={ ind } story={ story } { ...storyProps }/>
              </div>
            );
          })
        }
        {
          hasBorderBottom ? <StorySeparator /> : null
        }
      </div>
    );
  }
}

StoryGroup.propTypes = {
  stories: PropTypes.array,
  hasBorderBottom: PropTypes.bool
};

StoryGroup.defaultProps = {
  stories: [],
  hasBorderBottom: true
};
