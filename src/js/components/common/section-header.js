import React, { PropTypes } from 'react';

import ArticleHeader from 'components/common/article-header';
import { wrapperStyle } from './section-header.style';


export default class SectionHeader extends React.Component {
  render() {
    return (
      <div style={ wrapperStyle }>
        <ArticleHeader>
          { this.props.children }
        </ArticleHeader>
      </div>
    );
  }
}

SectionHeader.propTypes = {
  children: PropTypes.node
};
