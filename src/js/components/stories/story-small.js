import React, { PropTypes, Component } from 'react';

import ArticleSmall from 'components/common/article-small';
import ArticleContent from 'components/common/article-content';


export default class StorySmall extends Component {
  constructor(props) {
    super(props);
    this.onClick = () => {
      this.props.onClick(this.props.story);
    };
  }

  render() {
    return (
      <ArticleSmall
        onClick={ this.onClick }
        style={ this.props.style }
        header={ this.props.story.newspaperName }>
        <ArticleContent>{ this.props.story.title }</ArticleContent>
      </ArticleSmall>
    );
  }
}

StorySmall.propTypes = {
  onClick: PropTypes.func,
  story: PropTypes.shape({
    newspaperName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.object
};
