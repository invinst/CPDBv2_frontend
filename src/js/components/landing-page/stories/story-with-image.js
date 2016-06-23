import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import CoverImage from 'components/common/cover-image';
import {
  storyWrapperStyle, storyWrapperStyleTablet, storyWrapperStyleExtraWide,
  storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop, contentStyle, storyImageStyleExtraWide, outerWrapperStyle
} from './story-with-image.style';



class StoryWithImage extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.handleClick(this.props.story);
    };
  }

  responsiveStyle() {
    const { style } = this.props;
    return {
      [TABLET]: {
        outerWrapper: outerWrapperStyle,
        image: storyImageStyleTablet,
        wrapper: [storyWrapperStyle, storyWrapperStyleTablet],
        header: [paperStyleDesktop, style.header],
        paragraph: style.paragraph
      },
      [DESKTOP]: {
        outerWrapper: outerWrapperStyle,
        image: storyImageStyleDesktop,
        wrapper: [storyWrapperStyle],
        header: [paperStyleDesktop, style.header],
        paragraph: style.paragraph
      },
      [EXTRA_WIDE]: {
        outerWrapper: outerWrapperStyle,
        image: storyImageStyleExtraWide,
        wrapper: [storyWrapperStyle, storyWrapperStyleExtraWide],
        header: [paperStyleDesktop, style.header],
        paragraph: style.paragraph
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div key={ style.screen } style={ style.outerWrapper }
        className='story-with-image pure-g link--transition' onClick={ this.handleClick }>
        <div className='pure-u-2-3'>
          <CoverImage style={ style.image } src={ this.props.story.imageUrl }/>
        </div>
        <div className='pure-u-1-3'>
          <div style={ style.wrapper }>
            <div style={ contentStyle }>
              <ArticleHeader style={ style.header }>{ this.props.story.newspaperName }</ArticleHeader>
              <ArticleContent style={ style.paragraph }>
                { this.props.story.title }
              </ArticleContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StoryWithImage.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    newspaperName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }),
  style: PropTypes.shape({
    paragraph: PropTypes.object,
    header: PropTypes.object
  }),
  handleClick: PropTypes.func
};

StoryWithImage.defaultProps = {
  story: {
    id: 1,
    newspaperName: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
    imageUrl: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
  },
  style: {}
};

export default ConfiguredRadium(StoryWithImage);
