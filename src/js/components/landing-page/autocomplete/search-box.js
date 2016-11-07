import React, { Component, PropTypes } from 'react';


export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.currentTarget;
    if (value) {
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <input placeholder='Search' onChange={ this.handleChange }/>
      );
  }
}

SearchBox.propTypes = {
  handleChange: PropTypes.func
};
