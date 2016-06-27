import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { outerWrapperStyle, innerWrapperStyle, borderStyle } from './article-expanded.style';


class ArticleExpanded extends React.Component {
  render() {
    return (
      <div className={ this.props.className } style={ [outerWrapperStyle, this.props.style.outer] }>
        <div style={ borderStyle }>
          <div style={ [innerWrapperStyle, this.props.style.inner] }>
            { this.props.children }
          </div>
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

export default ConfiguredRadium(ArticleExpanded);
