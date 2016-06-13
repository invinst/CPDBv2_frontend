import React, { Component, PropTypes } from 'react';

import ExpandTransition from 'components/animation/expand-transition';
import FAQItemContent from './faq-item-content';
import { faqItemStyle, faqItemTitleStyle, faqItemActiveTitleStyle } from './faq-list-item.style';


export default class FAQListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { faq } = this.props;
    const { expanded } = this.state;

    return (
      <div className='pure-g'>
        <div className='pure-u-1-2' style={ faqItemStyle }>
          <div
            className='faq-title'
            style={ expanded ? faqItemActiveTitleStyle : faqItemTitleStyle }
            onClick={ this.onClick }>
            { faq.title }
          </div>
          <ExpandTransition
            childKey={ expanded ? faq.id : null }
            onFullyClosed={ (key) => {this.setState({ expanded: false });} }
            onExpansionBegin={ (key) => {this.setState({ expanded: true });} }>
            <FAQItemContent faq={ faq } expanded={ expanded } />
          </ExpandTransition>
        </div>
      </div>
    );
  }
}

FAQListItem.propTypes = {
  faq: PropTypes.shape({
    title: PropTypes.string
  }),
  childKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
