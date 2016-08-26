import React, { PropTypes } from 'react';

import ArticleSmall from 'components/common/article-small';
import { arrayOfN } from 'utils/prop-validators';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  desktopStyle, desktopBorderRightStyle, tabletBorderRightStyle,
  tabletBorderBottomStyle, tabletStyle, wrapperStyle,
  extraWideBorderRightStyle, extraWideStyle
} from './faq-section.style';


export default class FAQSection extends ResponsiveComponent {
  constructor(props) {
    super(props);
  }

  renderFAQ(faq, wrapperStyle) {
    return (
      <ArticleSmall
        hoverable={ true }
        style={ { wrapper: wrapperStyle } }
        paragraphs={ [faq.title] }
        onClick={ () => { this.props.onFAQClick(faq); } }/>
    );
  }

  renderTablet() {
    return (
      <div className='pure-g' style={ wrapperStyle }>
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
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className='pure-g' style={ wrapperStyle }>
        { this.props.faqs.map( (faq, ind) => (
          <div className='pure-u-1-3' key={ faq.id }>
            { this.renderFAQ(faq, ind < 2 ? desktopBorderRightStyle : desktopStyle) }
          </div>
        )) }
      </div>
    );
  }

  renderExtraWide() {
    return (
      <div className='pure-g' style={ wrapperStyle }>
        { this.props.faqs.map( (faq, ind) => (
          <div className='pure-u-1-3' key={ faq.id }>
            { this.renderFAQ(faq, ind < 2 ? extraWideBorderRightStyle : extraWideStyle) }
          </div>
        )) }
      </div>
    );
  }
}

FAQSection.propTypes = {
  faqs: arrayOfN(3),
  onFAQClick: PropTypes.func
};

FAQSection.defaultProps = {
  faqs: [
    {
      id: 1,
      title: 'How accurate is the data?'
    },
    {
      id: 2,
      title: 'Can I have access to the raw data set?'
    },
    {
      id: 3,
      title: 'How do I file a complaint against a Chicago Police Officer?'
    }
  ]
};
