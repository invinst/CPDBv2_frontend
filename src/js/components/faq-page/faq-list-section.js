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

  dispatchExpandFAQAction(expandFAQ, faq) {
    const { id, fieldProps } = faq;
    const answer = fieldProps.answer.value.getCurrentContent().getPlainText();
    const question = fieldProps.question.value.getCurrentContent().getPlainText();
    expandFAQ({ id, question, answer });
  }

  handleClick(faq) {
    const { editModeOn } = this.context;
    const { expandedId } = this.state;
    const { openBottomSheetWithFAQ, expandFAQ } = this.props;
    const { id } = faq;

    if (editModeOn) {
      openBottomSheetWithFAQ(id);
    } else {
      const nextId = id === expandedId ? null : id;
      if (nextId !== expandedId) {

        this.setState({
          expandedId: nextId
        });

        if (nextId !== null) {
          this.dispatchExpandFAQAction(expandFAQ, faq);
        }
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
    const { faqs, findItem, moveItem, updateFAQ } = this.props;

    const { expandedId } = this.state;
    const faqItems = faqs.map(faq => {
      return (
        <DraggableFAQListItem key={ faq.id } faqId={ faq.id } fieldProps={ faq.fieldProps }
          findItem={ findItem } moveItem={ moveItem } starred={ faq.meta.starred } updateFAQ={ updateFAQ }
          expandedId={ expandedId } handleClick={ this.handleClick.bind(this, faq) }/>
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
  expandFAQ: PropTypes.func,
  requestFAQs: PropTypes.func,
  findItem: PropTypes.func,
  moveItem: PropTypes.func,
  updateFAQ: PropTypes.func
};

FAQListSection.defaultProps = {
  faqs: [],
  requestFAQs: () => {}
};

FAQListSection.contextTypes = {
  editModeOn: PropTypes.bool
};
