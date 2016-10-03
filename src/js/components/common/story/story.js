import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import {
  storyWrapperStyle, sourceStyle, publicationDateStyle, titleStyle, sourceWrapperStyle, hoverColorStyle
} from './story.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';


export const SMALL_TITLE_STYLE = 'small';
export const NORMAL_TITLE_STYLE = 'normal';
export const BIG_TITLE_STYLE = 'big';
export const EXTRA_BIG_TITLE_STYLE = 'extraBig';
export const ULTRA_BIG_TITLE_STYLE = 'ultraBig';


class Story extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        source: [sourceStyle.base, sourceStyle.extraWide],
        publicationDate: [publicationDateStyle.base, publicationDateStyle.extraWide],
        title: titleStyle.extraWide
      },
      [DESKTOP]: {
        source: [sourceStyle.base, sourceStyle.desktop],
        publicationDate: [publicationDateStyle.base, publicationDateStyle.desktop],
        title: titleStyle.desktop
      },
      [TABLET]: {
        source: [sourceStyle.base, sourceStyle.tablet],
        publicationDate: [publicationDateStyle.base, publicationDateStyle.tablet],
        title: titleStyle.tablet
      }
    };
  }

  getHoverState() {
    return this.state.hover;
  }

  renderWithResponsiveStyle(style) {
    const { story, wrapperStyle, storyTitleSize, underlineStoryTitle, onClick } = this.props;

    return (
      <div
        className='story'
        style={ [storyWrapperStyle, wrapperStyle] } onClick={ () => { onClick(story); } }
        onMouseOver={ () => this.setState({ hover: true }) }
        onMouseOut={ () => this.setState({ hover: false }) }>
        <div style={ sourceWrapperStyle }>
          <span
            className='link--transition story-source'
            style={ [style.source, this.getHoverState() && hoverColorStyle] }>
            { story.publicationName }
          </span>
          <span
            className='link--transition story-post-date'
            style={ [style.publicationDate, this.getHoverState() && hoverColorStyle] }>
            { story.date }
          </span>
        </div>
        <div
          className='link--transition story-title'
          style={ [
            titleStyle.base, style.title[storyTitleSize], underlineStoryTitle && titleStyle.underline,
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
