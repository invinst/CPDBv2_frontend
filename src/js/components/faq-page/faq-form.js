import React, { Component, PropTypes } from 'react';


export default class FAQForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        Have a question? <input type='text' required='true' name='title'/>
        <button type='submit' disabled={ isSubmitting }>Ask</button>
      </form>
    );
  }
}

FAQForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};
