import React, { Component, PropTypes } from 'react';

import { inputStyle, inputEditStyle } from './string-input.style';


class StringInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange(this.input.value);
  }

  render() {
    const { value, editModeOn } = this.props;
    const style = editModeOn ? inputEditStyle : inputStyle;

    return (
      <input
        ref={ (el) => this.input = el }
        style={ style }
        value={ value }
        onChange={ this.handleChange }
        disabled={ !editModeOn }/>
    );
  }
}

StringInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool
};

StringInput.defaultProps = {
  value: ''
};

export default StringInput;
