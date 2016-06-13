import React, { Component, PropTypes } from 'react';

import FAQListItem from './faq-list-item';


export default class FAQListSection extends Component {
  render() {
    return (
      <div>
      {
        this.props.faqs.map(faq => {
          return (
            <FAQListItem key={ faq.id } faq={ faq } childKey={ faq.id }/>
          );
        })
      }
      </div>
    );
  }
}

FAQListSection.propTypes = {
  faqs: PropTypes.array.isRequired
};
