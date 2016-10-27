import React, { Component, PropTypes } from 'react';

import FAQListItem from './faq-list-item';
import { wrapperStyle } from './faq-list-section.style';


export default class FAQListSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedId: null
    };
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

  render() {
    const { expandedId } = this.state;

    return (
      <div style={ wrapperStyle }>
        {
          this.props.faqs.map(faq => {
            return (
              <FAQListItem key={ faq.id } faq={ faq } expandedId={ expandedId }
                handleClick={ this.handleClick.bind(this, faq.id) }/>
            );
          })
        }
      </div>
    );
  }
}

FAQListSection.propTypes = {
  faqs: PropTypes.array.isRequired,
  openBottomSheetWithFAQ: PropTypes.func
};

FAQListSection.contextTypes = {
  editModeOn: PropTypes.bool
};
