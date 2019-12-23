import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';

import * as inputStyles from './input.style';


export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaceholder: true,
      value: props.value,
    };
  }

  componentDidMount() {
    const { value, keyPressHandlers, blurOnKeyPress, keyPressWithBlurHandlers } = this.props;

    if (value) {
      // Make sure the text input cursor is always at the end
      this.input.setSelectionRange(value.length, value.length);
    }

    this.mousetrap = new Mousetrap(this.input);

    // Arbitrary key press handler
    if (keyPressHandlers) {
      for (const [key, handler] of Object.entries(keyPressHandlers)) {
        this.mousetrap.bind(key, handler);
      }
    }

    // Arbitrary key press handler along with input blur invocation
    if (keyPressWithBlurHandlers) {
      for (const [key, handler] of Object.entries(keyPressWithBlurHandlers)) {
        const handlerWithBlur = (...args) => {
          handler(...args);
          this.input.blur();
        };

        this.mousetrap.bind(key, handlerWithBlur);
      }
    }

    // Blur input element when one of these keys is pressed
    if (blurOnKeyPress) {
      blurOnKeyPress.map((key) => (this.mousetrap.bind(
        key,
        () => this.input.blur()
      )));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { focused, value } = nextProps;

    this.setState({ value });
    if (!this.props.focused && focused) {
      this.input.focus();
    }
  }

  handleFocus = event => {
    const { onFocus } = this.props;
    this.setState({ showPlaceholder: !this.state.value });
    if (onFocus) {
      onFocus(event);
    }
  };

  handleBlur = event => {
    const { onBlur } = this.props;
    this.setState({ showPlaceholder: !this.state.value });
    if (onBlur) {
      onBlur(event);
    }
  };

  handleChange = event => {
    const { onChange } = this.props;
    this.setState({
      showPlaceholder: !event.target.value,
      value: event.target.value,
    });
    if (onChange) {
      onChange(event);
    }
  };

  focus() {
    this.input.focus();
  }

  render() {
    const {
      style, paddingVertical, paddingHorizontal, width, height, placeholder, autoFocus,
      ...rest
    } = this.props;
    const { wrapperStyle, inputStyle, placeholderStyle } = inputStyles;
    const { value, showPlaceholder } = this.state;
    const _showPlaceholder = showPlaceholder && !rest.value;

    delete rest.value;
    delete rest.onChange;
    delete rest.onBlur;
    delete rest.onFocus;
    delete rest.keyPressHandlers;
    delete rest.blurOnKeyPress;
    delete rest.focused;
    delete rest.resetNavigation;
    delete rest.keyPressWithBlurHandlers;

    const _wrapperStyle = { ...wrapperStyle(width, height), ...style.wrapper };
    const _inputStyle = {
      ...inputStyle(paddingVertical, paddingHorizontal),
      ...style.input,
    };
    const _placeholderStyle = {
      ...placeholderStyle(height, paddingVertical, paddingHorizontal),
      ...style.placeholder,
    };

    return (
      <div style={ _wrapperStyle }>
        <input
          ref={ input => this.input = input }
          autoFocus={ autoFocus }
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
  autoFocus: PropTypes.bool,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  keyPressHandlers: PropTypes.object,
  keyPressWithBlurHandlers: PropTypes.object,
  blurOnKeyPress: PropTypes.array,
  on: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  focused: PropTypes.bool,
};

TextInput.defaultProps = {
  style: {},
  value: '',
  focused: false,
};
