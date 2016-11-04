import React, { Component, PropTypes } from 'react';

import { inputStyle, buttonStyle } from './link-button.style';

class LinkButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      showInputURL: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleInputBlur(event) {
    const { onLinkToggle } = this.props;
    const { url } = this.state;

    if (url != '') {
      onLinkToggle(url);
    }

    this.setState({
      showInputURL: false
    });
  }

  toggleLink() {
    const { showInputURL } = this.state;

    this.setState({
      showInputURL: !showInputURL
    });
  }

  render() {
    const { children } = this.props;
    const { showInputURL, url } = this.state;

    return (
      <div style={ inputStyle }>
        { showInputURL ?
          <input
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputBlur }
            type='text'
            placeholder='Type or paste a link'
            value={ url }/> :
          null
        }
        <span
          onMouseDown={ this.toggleLink }
          style={ buttonStyle }>
          { children }
        </span>
      </div>
    );
  }
}

LinkButton.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  onLinkToggle: PropTypes.func
};

export default LinkButton;
