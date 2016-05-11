import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import ExpandTransition from 'components/animation/expand-transition';
import ArticleSmall from 'components/common/article-small';
import ArticleFooter from 'components/common/article-footer';
import FAQFull from 'components/faq/faq-full';
import { arrayOfN } from 'utils/prop-validators';
import { articleStyle, borderRightStyle } from './faq-container.style';


export default class FAQContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFAQKey: null,
      faqExpanded: {}
    };
    this.onStoryOpen = id => { this.setState({ selectedFAQKey: id }); };
    this.onStoryClose = id => { this.setState({ selectedFAQKey: null }); };
    this.onFAQFullyClosed = key => { this.setState({ faqExpanded: { [key]: false } }); };
    this.onFAQExpandingBegin = key => { this.setState({ faqExpanded: { [key]: true } }); };
  }

  render() {
    const className = classNames('pure-g', this.props.className);
    const articleBorderRightStyle = _.assign({}, articleStyle, borderRightStyle);

    return (
      <div className={ className }>
        { this.props.faqs.map( (faq, ind) => (
          <div className='pure-u-1-3' key={ faq.id }>
            <ArticleSmall
              header='FAQ' content={ faq.question }
              style={ ind < 2 ? articleBorderRightStyle : articleStyle }
              onOpen={ this.onStoryOpen }
              onClose={ this.onStoryClose }
              identifier={ faq.id }
              expanded={ this.state.faqExpanded[faq.id] }
              active={ faq.id === this.state.selectedFAQKey }/>
          </div>
        )) }
        <ExpandTransition
          childKey={ this.state.selectedFAQKey }
          onFullyClosed={ this.onFAQFullyClosed }
          onExpandingBegin={ this.onFAQExpandingBegin }>
          <FAQFull className='pure-u-1-1'/>
        </ExpandTransition>
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
