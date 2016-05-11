import React, { PropTypes } from 'react';
import Radium from 'radium';

import { outerWrapperStyle, innerWrapperStyle } from './article-expanded.style';


class ArticleExpanded extends React.Component {
  render() {
    return (
      <div className={ this.props.className } style={ [outerWrapperStyle, this.props.style.outer] }>
        <div style={ [innerWrapperStyle, this.props.style.inner] }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

ArticleExpanded.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({
    outer: PropTypes.object,
    inner: PropTypes.object
  }),
  className: PropTypes.string
};

ArticleExpanded.defaultProps = {
  style: {}
};

export default Radium(ArticleExpanded);
