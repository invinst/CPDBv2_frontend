import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import {
  storyWrapperStyle, sourceStyle, postDateStyle, titleStyle, sourceWrapperStyle, hoverColorStyle
} from './story.style';


export const SMALL_TITLE_STYLE = 'small';
export const NORMAL_TITLE_STYLE = 'normal';
export const BIG_TITLE_STYLE = 'big';
export const EXTRA_BIG_TITLE_STYLE = 'extraBig';
export const ULTRA_BIG_TITLE_STYLE = 'ultraBig';


class Story extends Component {
  constructor(props) {
    super(props);
  }

  getHoverState() {
    return this.state.hover;
  }

  render() {
    const { story, wrapperStyle, storyTitleSize, underlineStoryTitle, onClick } = this.props;

    return (
      <div
        style={ [storyWrapperStyle, wrapperStyle] } onClick={ () => { onClick(story); } }
        onMouseOver={ () => this.setState({ hover: true }) }
        onMouseOut={ () => this.setState({ hover: false }) }>
        <div style={ sourceWrapperStyle }>
          <span
            className='link--transition story-source'
            style={ [sourceStyle, this.getHoverState() && hoverColorStyle] }>
            { story.newspaperName }
          </span>
          <span
            className='link--transition story-post-date'
            style={ [postDateStyle, this.getHoverState() && hoverColorStyle] }>
            { story.date }
          </span>
        </div>
        <div
          className='link--transition story-title'
          style={ [
            titleStyle.base, titleStyle[storyTitleSize], underlineStoryTitle && titleStyle.underline,
            this.getHoverState() && hoverColorStyle] }>
          { story.title }
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  story: PropTypes.object,
  onClick: PropTypes.func,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  storyTitleSize: PropTypes.string,
  underlineStoryTitle: PropTypes.bool
};

Story.defaultProps = {
  storyTitleSize: NORMAL_TITLE_STYLE,
  underlineStoryTitle: false
};

export default ConfiguredRadium(Story);
