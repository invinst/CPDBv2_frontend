import PropTypes from 'prop-types';
import React from 'react';

import ArticleHeader from 'components/common/article-header';
import { wrapperStyle } from './section-header.style';


export default function SectionHeader(props) {
  return (
    <div style={ wrapperStyle }>
      <ArticleHeader>
        { props.children }
      </ArticleHeader>
    </div>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node,
};
