import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { outerWrapperStyle, innerWrapperStyle, borderStyle } from './article-expanded.style';


function ArticleExpanded(props) {
  return (
    <div className={ props.className } style={ [outerWrapperStyle, props.style.outer] }>
      <div style={ borderStyle }>
        <div style={ [innerWrapperStyle, props.style.inner] }>
          { props.children }
        </div>
      </div>
    </div>
  );
}

ArticleExpanded.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({
    outer: PropTypes.object,
    inner: PropTypes.object,
  }),
  className: PropTypes.string,
};

ArticleExpanded.defaultProps = {
  style: {},
};

export default ConfiguredRadium(ArticleExpanded);
