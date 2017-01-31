import React, { Component, PropTypes } from 'react';

import ExpandTransition from 'components/animation/expand-transition';
import FAQItemContent from './faq-item-content';
import { faqItemWrapperStyle, faqItemStyle, faqItemExpandedStyle } from './faq-list-item.style';
import FAQItem from 'components/common/faq/faq-item';


class FAQListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expanded: nextProps.expandedId === nextProps.faqId
    });
  }

  render() {
    const { faqId, handleClick, fieldProps } = this.props;
    const { expanded } = this.state;

    return (
      <div style={ faqItemWrapperStyle }>
        <FAQItem
          fieldProps={ fieldProps } faqId={ faqId }
          onClick={ handleClick } wrapperStyle={ expanded ? faqItemExpandedStyle : faqItemStyle }/>
        <ExpandTransition
          childKey={ expanded ? faqId : null }
          onFullyClosed={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: false });}
          }
          onExpansionBegin={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: true });}
          }>
          <FAQItemContent fieldProps={ fieldProps } expanded={ expanded }/>
        </ExpandTransition>
      </div>
    );
  }
}

FAQListItem.propTypes = {
  fieldProps: PropTypes.object,
  faqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.func.isRequired,
  expandedId: PropTypes.number
};

export default FAQListItem;
