import React, { Component, PropTypes } from 'react';

import DroppableFAQListSection from './droppable-faq-list-section';
import FAQListSection from './faq-list-section';


export default class FAQListWrapper extends Component {
  render() {
    const { editModeOn, ...rest } = this.props;

    if (editModeOn) {
      return (
        <DroppableFAQListSection editModeOn={ editModeOn } { ...rest }/>
      );
    } else {
      return (
        <FAQListSection editModeOn={ editModeOn } { ...rest }/>
      );
    }
  }
}

FAQListWrapper.propTypes = {
  editModeOn: PropTypes.bool
};
