import React, { Component, PropTypes } from 'react';

import DroppableFAQListSection from './droppable-faq-list-section';
import FAQListSection from './faq-list-section';


export default class FAQListWrapper extends Component {
  componentDidMount() {
    const { requested, requestFAQs } = this.props;
    if (!requested) {
      requestFAQs();
    }
  }

  render() {
    const { editModeOn, ...rest } = this.props;
    delete rest.requestFAQs;
    delete rest.requested;

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
  requestFAQs: PropTypes.func,
  requested: PropTypes.bool,
  editModeOn: PropTypes.bool
};

FAQListWrapper.defaultProps = {
  requestFAQs: () => {},
  requested: false
};
