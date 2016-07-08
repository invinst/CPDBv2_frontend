import React, { PropTypes, Component } from 'react';

import ArticleSmall from 'components/common/article-small';


export default class StoryNoImage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.handleClick(this.props.story);
    };
  }

  render() {
    return (
      <ArticleSmall
        hoverable={ true }
        onClick={ this.handleClick }
        style={ this.props.style }
        header={ this.props.story.newspaperName }
        paragraphs={ [this.props.story.title] }/>
    );
  }
}

StoryNoImage.propTypes = {
  handleClick: PropTypes.func,
  story: PropTypes.shape({
    newspaperName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.object
};

StoryNoImage.defaultProps = {
  style: {}
};
