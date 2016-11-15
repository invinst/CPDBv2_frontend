import React, { Component, PropTypes } from 'react';

import Bubble from './bubble';
import Input from './input';
import { inputStyle } from './url-input.style';


export default class UrlInput extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.url = '';
  }

  handleChange(event) {
    this.url = event.target.value;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onEntryFinished(this.url);
    }
  }

  render() {
    const { style } = this.props;
    return (
      <Bubble style={ style }>
        <Input
          style={ inputStyle }
          focusAfterMount={ true }
          paddingVertical={ 15 }
          paddingHorizontal={ 15 }
          width={ 300 }
          height={ 50 }
          placeholder='Type or paste a link'
          type='text'
          onChange={ this.handleChange }
          onKeyPress={ this.handleKeyPress }/>
      </Bubble>
    );
  }
}

UrlInput.propTypes = {
  style: PropTypes.object,
  onEntryFinished: PropTypes.func
};
