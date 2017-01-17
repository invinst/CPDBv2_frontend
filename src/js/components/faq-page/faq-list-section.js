import React, { Component, PropTypes } from 'react';

import DraggableFAQListItem from './draggable-faq-list-item';
import { wrapperStyle, addFaqButtonStyle } from './faq-list-section.style';


export default class FAQListSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedId: null
    };
    this.renderAddFaqButton = this.renderAddFaqButton.bind(this);
    props.requestFAQs();
  }

  handleClick(faqId) {
    const { editModeOn } = this.context;
    const { expandedId } = this.state;
    const { openBottomSheetWithFAQ } = this.props;

    if (editModeOn) {
      openBottomSheetWithFAQ(faqId);
    } else {
      const nextId = faqId === expandedId ? null : faqId;
      if (nextId !== expandedId) {
        this.setState({
          expandedId: nextId
        });
      }
    }
  }

  renderAddFaqButton() {
    const { editModeOn } = this.context;

    if (!editModeOn) {
      return null;
    }

    return (
      <div
        className='add-faq-btn'
        onClick={ this.props.openBottomSheetToCreateFAQ }
        style={ addFaqButtonStyle }>
        [+]
      </div>
    );
  }

  render() {
    const { faqs, findItem, moveItem } = this.props;

    const { expandedId } = this.state;
    const faqItems = faqs.map(faq => {
      return (
        <DraggableFAQListItem key={ faq.id } faqId={ faq.id } fieldProps={ faq.fieldProps }
          findItem={ findItem } moveItem={ moveItem }
          expandedId={ expandedId } handleClick={ this.handleClick.bind(this, faq.id) }/>
      );
    });

    return (
      <div style={ wrapperStyle }>
        { this.renderAddFaqButton() }
        { faqItems }
      </div>
    );
  }
}

FAQListSection.propTypes = {
  faqs: PropTypes.array.isRequired,
  openBottomSheetWithFAQ: PropTypes.func,
  openBottomSheetToCreateFAQ: PropTypes.func,
  requestFAQs: PropTypes.func,
  findItem: PropTypes.func,
  moveItem: PropTypes.func
};

FAQListSection.defaultProps = {
  faqs: [],
  requestFAQs: () => {}
};

FAQListSection.contextTypes = {
  editModeOn: PropTypes.bool
};
