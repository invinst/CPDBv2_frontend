import React, { Component, PropTypes } from 'react';

import { wrapperStyle, inputStyle, placeholderStyle } from './input.style';


export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showPlaceholder: true,
      value: props.value
    };
  }

  componentDidMount() {
    const { focusAfterMount } = this.props;
    if (focusAfterMount) {
      this.inputEl.focus();
    }
  }

  handleFocus(event) {
    const { onFocus } = this.props;
    this.setState({
      showPlaceholder: !this.state.value
    });
    if (onFocus) {
      onFocus(event);
    }
  }

  handleBlur(event) {
    const { onBlur } = this.props;
    this.setState({ showPlaceholder: !this.state.value });
    if (onBlur) {
      onBlur(event);
    }
  }

  handleChange(event) {
    const { onChange } = this.props;
    this.setState({
      showPlaceholder: !event.target.value,
      value: event.target.value
    });
    if (onChange) {
      onChange(event);
    }
  }

  render() {
    const {
      style, paddingVertical, paddingHorizontal, width, height,
      placeholder, ...rest
    } = this.props;
    delete rest.value;
    delete rest.onChange;
    delete rest.onBlur;
    delete rest.onFocus;
    delete rest.focusAfterMount;
    const { value, showPlaceholder } = this.state;
    const _showPlaceholder = showPlaceholder && !rest.value;
    const _wrapperStyle = { ...wrapperStyle(width, height), ...style.wrapper };
    const _inputStyle = {
      ...inputStyle(paddingVertical, paddingHorizontal),
      ...style.input
    };
    const _placeholderStyle = {
      ...placeholderStyle(height, paddingVertical, paddingHorizontal),
      ...style.placeholder
    };

    return (
      <div style={ _wrapperStyle }>
        <input
          ref={ el => {
            if (el !== null) {
              this.inputEl = el;
            }
          } }
          style={ _inputStyle }
          value={ value }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          onChange={ this.handleChange }
          { ...rest }/>
        { _showPlaceholder ?
          <div style={ _placeholderStyle }>
            { placeholder }
          </div> :
          null
        }
      </div>
    );
  }
}

TextInput.propTypes = {
  style: PropTypes.object,
  focusAfterMount: PropTypes.bool,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

TextInput.defaultProps = {
  style: {},
  value: ''
};
