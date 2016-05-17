import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ArticleSmall from 'components/common/article-small';
import ArticleContent from 'components/common/article-content';
import ArticleFooter from 'components/common/article-footer';
import SectionHeader from 'components/common/section-header';
import { arrayOfN } from 'utils/prop-validators';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  desktopStyle, desktopBorderRightStyle, tabletBorderRightStyle,
  tabletBorderBottomStyle, tabletStyle, wrapperStyle
} from './faq-container.style';


export default class FAQContainer extends ResponsiveComponent {
  constructor(props) {
    super(props);
  }

  renderFAQ(faq, style) {
    return (
      <ArticleSmall
        style={ style }>
        <ArticleContent>{ faq.question }</ArticleContent>
      </ArticleSmall>
    );
  }

  renderTablet() {
    const className = classNames('pure-g', this.props.className);

    return (
      <div className={ className } style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>FAQ</SectionHeader>
        </div>
        <div className='pure-u-1-2'>
          { this.renderFAQ(this.props.faqs[0], tabletBorderRightStyle) }
        </div>
        <div className='pure-u-1-2'>
          { this.props.faqs.slice(1).map( (faq, ind) => (
            <div key={ ind }>
              { this.renderFAQ(
                  faq,
                  ind === 0 ? tabletBorderBottomStyle : tabletStyle
              ) }
            </div>
          )) }
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More FAQ</ArticleFooter>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const className = classNames('pure-g', this.props.className);

    return (
      <div className={ className } style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>FAQ</SectionHeader>
        </div>
        { this.props.faqs.map( (faq, ind) => (
          <div className='pure-u-1-3' key={ faq.id }>
            { this.renderFAQ(faq, ind < 2 ? desktopBorderRightStyle : desktopStyle) }
          </div>
        )) }
        <div className='pure-u-1-1'>
          <ArticleFooter>More FAQ</ArticleFooter>
        </div>
      </div>
    );
  }
}

FAQContainer.propTypes = {
  faqs: arrayOfN(3),
  className: PropTypes.string
};

FAQContainer.defaultProps = {
  faqs: [
    {
      id: 1,
      question: 'How accurate is the data?'
    },
    {
      id: 2,
      question: 'Can I have access to the raw data set?'
    },
    {
      id: 3,
      question: 'How do I file a complaint against a Chicago Police Officer?'
    }
  ]
};
