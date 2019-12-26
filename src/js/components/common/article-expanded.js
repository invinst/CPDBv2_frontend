import PropTypes from 'prop-types';
import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { outerWrapperStyle, innerWrapperStyle, borderStyle } from './article-expanded.style';


function ArticleExpanded(props) {
  const { className, style, children } = props;

  return (
    <div className={ className } style={ [outerWrapperStyle, style.outer] }>
      <div style={ borderStyle }>
        <div style={ [innerWrapperStyle, style.inner] }>
          { children }
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
