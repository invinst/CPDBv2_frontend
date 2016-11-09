import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ExpandTransition from 'components/animation/expand-transition';
import FAQItemContent from './faq-item-content';
import { faqItemWrapperStyle, faqItemExpandedStyle } from './faq-list-item.style';
import FAQItem from 'components/common/faq/faq-item';


class FAQListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expanded: nextProps.expandedId === nextProps.faq.id
    });
  }

  render() {
    const { faq, handleClick } = this.props;
    const { expanded } = this.state;

    return (
      <div style={ faqItemWrapperStyle }>
        <FAQItem faq={ faq } onClick={ handleClick } wrapperStyle={ [expanded && faqItemExpandedStyle] }/>
        <ExpandTransition
          childKey={ expanded ? faq.id : null }
          onFullyClosed={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: false });}
          }
          onExpansionBegin={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: true });}
          }>
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
    question: PropTypes.string,
    answer: PropTypes.array
  }),
  handleClick: PropTypes.func.isRequired,
  expandedId: PropTypes.number
};

export default ConfiguredRadium(FAQListItem);
