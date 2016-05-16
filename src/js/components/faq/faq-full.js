import React, { PropTypes } from 'react';

import ArticleContent from 'components/common/article-content';
import ArticleExpanded from 'components/common/article-expanded';
import { innerWrapperStyle } from './faq-full.style';


export default class FAQFull extends React.Component {
  render() {
    return (
      <ArticleExpanded className={ this.props.className }
        style={ { inner: innerWrapperStyle, outer: this.props.style } }>
        {
          this.props.faq.paragraphs.map((paragraph, ind) => (
            <ArticleContent key={ ind }>{ paragraph }</ArticleContent>
          ))
        }
      </ArticleExpanded>
    );
  }
}

FAQFull.propTypes = {
  faq: PropTypes.shape({
    paragraphs: PropTypes.arrayOf(PropTypes.string)
  }),
  className: PropTypes.string,
  style: PropTypes.object
};

FAQFull.defaultProps = {
  faq: {
    paragraphs: [
      [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ',
        'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ',
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ',
        'deserunt mollit anim id est laborum.'
      ].join('')
    ]
  }
};
