import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ArticleContent from 'components/common/article-content';
import ArticleFooter from 'components/common/article-footer';
import { footerStyle, leftBarStyle, rightBarStyle } from './faq-full.style';
import { DESKTOP, FAQ_PATH } from 'utils/constants';


export default class FAQFull extends React.Component {
  render() {
    let { faq, className, style, closeBottomSheet } = this.props;
    className = classNames('faq-full pure-g', className);

    return (
      <div className={ className } style={ { outer: style } }>
        <div className='pure-u-1-4'>
          <div style={ leftBarStyle }>
            <ArticleContent device={ DESKTOP }>{ faq.title }</ArticleContent>
          </div>
        </div>
        <div className='pure-u-3-4'>
          <div style={ rightBarStyle }>
            {
              faq.paragraphs.map((paragraph, ind) => (
                <ArticleContent device={ DESKTOP } key={ ind }>{ paragraph }</ArticleContent>
              ))
            }
          </div>
        </div>
        <ArticleFooter device={ DESKTOP } className='pure-u-1-1'
          style={ { wrapper: footerStyle } } to={ FAQ_PATH }
          onClick={ closeBottomSheet }>
          More FAQ
        </ArticleFooter>
      </div>
    );
  }
}

FAQFull.propTypes = {
  faq: PropTypes.shape({
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string)
  }),
  closeBottomSheet: PropTypes.func,
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
