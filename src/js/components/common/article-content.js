import React, { PropTypes } from 'react';
import Radium from 'radium';

import { contentStyle } from './article-content.style';


class ArticleContent extends React.Component {
  render() {
    return (
      <p style={ contentStyle }>
        { this.props.children }
      </p>
    );
  }
}

ArticleContent.propTypes = {
  children: PropTypes.node
};

export default Radium(ArticleContent);
