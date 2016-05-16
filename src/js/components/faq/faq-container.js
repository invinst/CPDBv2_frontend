import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ArticleSmall from 'components/common/article-small';
import ArticleContent from 'components/common/article-content';
import ArticleFooter from 'components/common/article-footer';
import FAQFull from 'components/faq/faq-full';
import Expandable from 'components/common/expandable';
import { arrayOfN } from 'utils/prop-validators';
import { TOP, BOTTOM } from 'utils/constants';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  desktopStyle, desktopBorderRightStyle, tabletBorderRightStyle,
  tabletBorderBottomStyle, tabletStyle, wrapperStyle
} from './faq-container.style';


const FAQExpandable = Expandable(FAQFull, { className: 'pure-u-1-1' });

export default class FAQContainer extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFAQKey: null,
      faqExpanded: {},
      expandDirection: BOTTOM
    };
    this.onStoryOpen = ([id, dir]) => { this.setState({ selectedFAQKey: id, expandDirection: dir }); };
    this.onStoryClose = ([id, dir]) => { this.setState({ selectedFAQKey: null }); };
    this.onFAQFullyClosed = key => { this.setState({ faqExpanded: { [key]: false } }); };
    this.onFAQExpansionBegin = key => { this.setState({ faqExpanded: { [key]: true } }); };
  }

  renderFAQ(faq, style, dir) {
    return (
      <ArticleSmall
        header='FAQ'
        style={ style }
        onOpen={ this.onStoryOpen }
        onClose={ this.onStoryClose }
        identifier={ [faq.id, dir] }
        expandDirection={ dir }
        expanded={ this.state.faqExpanded[faq.id] }
        active={ faq.id === this.state.selectedFAQKey }>
        <ArticleContent>{ faq.question }</ArticleContent>
      </ArticleSmall>
    );
  }

  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    const className = classNames('pure-g', this.props.className);

    return (
      <div className={ className } style={ wrapperStyle }>
        <FAQExpandable
          childKey={ this.state.selectedFAQKey }
          expandDirection={ this.state.expandDirection }
          onFullyClosed={ this.onFAQFullyClosed }
          onExpansionBegin={ this.onFAQExpansionBegin }>
          <div className='pure-u-1-2'>
            { this.renderFAQ(this.props.faqs[0], tabletBorderRightStyle, BOTTOM) }
          </div>
          <div className='pure-u-1-2'>
            { this.props.faqs.slice(1).map( (faq, ind) => (
              <div key={ ind }>
                { this.renderFAQ(
                    faq,
                    ind === 0 ? tabletBorderBottomStyle : tabletStyle,
                    ind === 0 ? TOP : BOTTOM
                ) }
              </div>
            )) }
          </div>
        </FAQExpandable>
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
        <FAQExpandable
          childKey={ this.state.selectedFAQKey }
          expandDirection={ this.state.expandDirection }
          onFullyClosed={ this.onFAQFullyClosed }
          onExpansionBegin={ this.onFAQExpansionBegin }>
          { this.props.faqs.map( (faq, ind) => (
            <div className='pure-u-1-3' key={ faq.id }>
              { this.renderFAQ(faq, ind < 2 ? desktopBorderRightStyle : desktopStyle, BOTTOM) }
            </div>
          )) }
        </FAQExpandable>
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
