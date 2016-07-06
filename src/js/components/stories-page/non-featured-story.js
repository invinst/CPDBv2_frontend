import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { storyStyle, edgeStoryStyle, imageStyle, imageStoryWrapperStyle } from './non-featured-story.style';
import CoverImage from 'components/common/cover-image';
import ArticleSmall from 'components/common/article-small';


class NonFeaturedStory extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.handleClick(this.props.story);
    };
  }

  renderStory() {
    const { story, layout: { isDisplayImage, position } } = this.props;

    if (isDisplayImage) {
      // TODO: radium does not handle wrapper hover style when we render ArticleSmall, will move this into another
      // component later
      return (
        <div className='pure-g' onClick={ this.handleClick } style={ imageStoryWrapperStyle }>
          <div className='pure-u-1-2'>
            <CoverImage style={ imageStyle } src={ story.imageUrl }/>
          </div>
          <div className='pure-u-1-2'>
            <ArticleSmall
              hoverable={ true }
              onClick={ this.handleClick }
              style={ edgeStoryStyle }
              header={ story.newspaperName }
              paragraphs={ [story.title] }/>
          </div>
        </div>
      );
    }
    return (
      <ArticleSmall
        hoverable={ true }
        onClick={ this.handleClick }
        style={ position > 0 ? storyStyle : edgeStoryStyle }
        header={ story.newspaperName }
        paragraphs={ [story.title] }/>
    );
  }

  getWrapperClass() {
    const { layout: { isDisplayImage, grids } } = this.props;
    if (isDisplayImage) {
      if (grids == 4) {
        return 'pure-u-1-2';
      }

      return `pure-u-2-${grids}`;
    }
    return `pure-u-1-${grids}`;
  }

  render() {
    return (
      <div className={ this.getWrapperClass() }>
        { this.renderStory() }
      </div>
    );
  }
}

NonFeaturedStory.propTypes = {
  story: PropTypes.object,
  handleClick: PropTypes.func,
  layout: PropTypes.shape({
    grids: PropTypes.number,
    position: PropTypes.number,
    isDisplayImage: PropTypes.bool
  })
};

NonFeaturedStory.defaultProps = {
  layout: {
    grids: 5,
    position: 0,
    isDisplayImage: false
  }
};

export default ConfiguredRadium(NonFeaturedStory);
