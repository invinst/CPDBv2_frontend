import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { askQuestion } from 'actions/faq-page';
import { getIsSubmitting } from 'selectors/faq-page/faq-form-selector';
import FAQForm from 'components/faq-page/faq-form';


export class UnconnectedFAQFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      title: event.target.title.value
    };

    const { target } = event;

    this.props.askQuestion(data).then(function () {
      target.reset();
    });
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <FAQForm handleSubmit={ this.handleSubmit } isSubmitting={ isSubmitting }/>
    );
  }
}

UnconnectedFAQFormContainer.propTypes = {
  askQuestion: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    isSubmitting: getIsSubmitting(state)
  };
}

const mapDispatchToProps = {
  askQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQFormContainer);
