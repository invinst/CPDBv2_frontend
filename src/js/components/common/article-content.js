import React, { PropTypes } from 'react';
import Radium from 'radium';

import { contentStyle } from './article-content.style';


class ArticleContent extends React.Component {
  render() {
    return (
      <p style={ [contentStyle, this.props.style] }>
        { this.props.children }
      </p>
    );
  }
}

ArticleContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default Radium(ArticleContent);
