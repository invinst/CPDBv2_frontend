import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import ExpandTransition from 'components/animation/expand-transition';
import FAQItemContent from './faq-item-content';
import { faqItemStyle, faqItemTitleStyle } from './faq-list-item.style';


class FAQListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { faq } = this.props;
    const { expanded } = this.state;

    return (
      <div style={ faqItemStyle }>
        <div
          className='faq-title'
          style={ [faqItemTitleStyle.base, expanded && faqItemTitleStyle.expanded] }
          onClick={ this.handleClick }>
          { faq.title }
        </div>
        <ExpandTransition
          childKey={ expanded ? faq.id : null }
          onFullyClosed={ (key) => {this.setState({ expanded: false });} }
          onExpansionBegin={ (key) => {this.setState({ expanded: true });} }>
          <FAQItemContent faq={ faq } expanded={ expanded } />
        </ExpandTransition>
      </div>
    );
  }
}

FAQListItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.array
  }),
  childKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Radium(FAQListItem);
